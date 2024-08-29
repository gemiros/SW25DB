import { useEffect, useState } from 'react';
import { Top } from './createparts/top';
import { Status } from './createparts/status';
import { Parts } from './createparts/parts';
import { Abilitys } from './createparts/abilitys';
import { Bootys } from './createparts/bootys';
import { Explanation } from './createparts/explanation';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { abilitysInit, statusInit, tooInit } from '../const/monster';
import { editData, postData } from '../../firebaseConfig';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type Props = {
  monsters?: monster.monster[]
  setSnackbarText: (s: string) => void
  setOpen: (o: boolean) => void
}

const MonsterCreate = (props: Props) => {
  const { setSnackbarText, setOpen } = props
  const navigate = useNavigate()
  const { name } = useParams<{ name: string }>()
  const [top, setTop] = useState<monster.top>(structuredClone(tooInit))
  const [tags, setTags] = useState<string[]>(['main'])
  const [status, setStatus] = useState<monster.status>(structuredClone(statusInit))
  const [levels, setLevels] = useState<monster.level[]>([])
  const [abilitys, setAbilitys] = useState<monster.abilitys>(structuredClone(abilitysInit))
  const [bootys, setBootys] = useState<monster.booty[]>([])
  const [explanation, setExplanation] = useState<string>('')
  const [paraName, setParaName] = useState<string>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [statusExpanded, setStatusExpanded] = useState(true);
  const [partNameList, setPartNameList] = useState<string[]>(["全身"])
  const [monsId, setMonsId] = useState<string>('')
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const locate = useLocation()

  const toggleStatusAccordion = () => {
    setStatusExpanded(!statusExpanded);
  };
  const createMonster = async () => {
    setButtonDisabled(true)
    const data: monster.monster = {
      id: '',
      Top: top,
      Status: status,
      Parts: levels,
      Abilitys: abilitys,
      Explanation: explanation,
      Tags: tags
    }
    console.log(data);
    setOpen(true)
    await postData(data).then(() => {
      setButtonDisabled(false)
      setSnackbarText('モンスターデータ作成完了！')
      navigate('/')
    }).catch(() => {
      setButtonDisabled(false)
      setSnackbarText('モンスターデータ作成失敗！')
      navigate('/')
    })
  }
  const editMonster = async () => {
    setButtonDisabled(true)
    const data: monster.monster = {
      id: monsId,
      Top: top,
      Status: status,
      Parts: levels,
      Abilitys: abilitys,
      Explanation: explanation,
      Tags: tags
    }
    console.log(data);
    setOpen(true)
    await editData(data).then(() => {
      setButtonDisabled(false)
      setSnackbarText('モンスターデータ編集完了！')
      navigate('/')
    }).catch(() => {
      setButtonDisabled(false)
      setSnackbarText('モンスターデータ編集失敗！')
      navigate('/')
    })
  }
  useEffect(() => {
    const tmp = structuredClone(levels)
    const parts = tmp.length ? tmp[0].parts ? tmp[0].parts.map((part) => part.name) : [] : []
    let resPart = ["全身"]
    resPart.push(...parts)
    resPart = Array.from(new Set(resPart))
    setPartNameList(resPart)
  }, [levels])

  useEffect(() => {
    if (props.monsters) {
      const dup = props.monsters.filter((m) => m.Top).find((m) => m.Top.name == name)
      if (dup) {
        setMonsId(dup.id)
        setTop(dup.Top)
        setTags(dup.Tags)
        setStatus(dup.Status)
        setLevels(dup.Parts)
        setAbilitys(dup.Abilitys)
        if (dup.Bootys) {
          setBootys(dup.Bootys)
        } else {
          setBootys([])
        }
        setExplanation(dup.Explanation)
      } else {
        setMonsId('')
        setTop(structuredClone(tooInit))
        setTags(['main'])
        setStatus(structuredClone(statusInit))
        setLevels([])
        setAbilitys(structuredClone(abilitysInit))
        setBootys([])
        setExplanation('')
      }
    }
    setParaName(name ?? '')
  }, [name, props.monsters])

  useEffect(() => {
    const l = locate.pathname
    const i = l.indexOf('/monster/edit')
    setIsEdit(i >= 0)
  }, [])

  return (
    <div style={{ padding: '0' }}>
      <h2>モンスター作成</h2>
      <Top top={top} setTop={setTop} tags={tags} setTags={setTags} paramName={paraName ?? ''} />
      <Accordion expanded={statusExpanded} onChange={toggleStatusAccordion}>
        <AccordionSummary
          expandIcon={statusExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        ><Typography variant="h6">ステータス</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Status race={top.race} status={status} setStatus={setStatus} paramName={paraName ?? ''} />
        </AccordionDetails>
      </Accordion>
      <Parts levels={levels} setLevels={setLevels} race={top.race} lv={top.lv} paramName={paraName ?? ''} />
      <Abilitys partNameList={partNameList} top={top} abilitys={abilitys} setAbilitys={setAbilitys} paramName={paraName ?? ''} />
      <Bootys bootys={bootys} setBootys={setBootys} paramName={paraName ?? ''} />
      <Explanation explanation={explanation} setExplanation={setExplanation} paramName={paraName ?? ''} />
      <Grid justifyContent={'end'} container>
        {isEdit
          ? <Button disabled={buttonDisabled} style={{ margin: '1em' }} variant='contained' onClick={editMonster}>編集</Button>
          : <Button disabled={buttonDisabled} style={{ margin: '1em' }} variant='contained' onClick={createMonster}>作成</Button>
        }
      </Grid>
    </div>
  );
};

export default MonsterCreate;