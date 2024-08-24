import React, { useEffect, useState } from 'react';
import { Top } from './createparts/top';
import { Status } from './createparts/status';
import { Parts } from './createparts/parts';
import { Abilitys } from './createparts/abilitys';
import { Bootys } from './createparts/bootys';
import { Explanation } from './createparts/explanation';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { abilitysInit, statusInit, tooInit } from '../const/monster';

const MonsterCreate: React.FC = () => {
  const [top, setTop] = useState<monster.top>(structuredClone(tooInit))
  const [tags, setTags] = useState<string[]>([])
  const [status, setStatus] = useState<monster.status>(structuredClone(statusInit))
  const [levels, setLevels] = useState<monster.level[]>([])
  const [abilitys, setAbilitys] = useState<monster.abilitys>(structuredClone(abilitysInit))
  const [bootys, setBootys] = useState<monster.booty[]>([])
  const [explanation, setExplanation] = useState<string>('')

  const [statusExpanded, setStatusExpanded] = useState(true);
  const [partNameList, setPartNameList] = useState<string[]>(["全身"])
  const toggleStatusAccordion = () => {
    setStatusExpanded(!statusExpanded);
  };
  const createMonster = () => {
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

  }
  useEffect(() => {
    const tmp = structuredClone(levels)
    const parts = tmp.length ? tmp[0].parts ? tmp[0].parts.map((part) => part.name) : [] : []
    let resPart = ["全身"]
    resPart.push(...parts)
    resPart = Array.from(new Set(resPart))
    setPartNameList(resPart)
  }, [levels])

  return (
    <div>
      <h2>モンスター作成</h2>
      <Top top={top} setTop={setTop} tags={tags} setTags={setTags} />
      <Accordion expanded={statusExpanded} onChange={toggleStatusAccordion}>
        <AccordionSummary
          expandIcon={statusExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        ><Typography variant="h6">ステータス</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Status status={status} setStatus={setStatus} />
        </AccordionDetails>
      </Accordion>
      <Parts levels={levels} setLevels={setLevels} />
      <Abilitys partNameList={partNameList} top={top} abilitys={abilitys} setAbilitys={setAbilitys} />
      <Bootys bootys={bootys} setBootys={setBootys} />
      <Explanation explanation={explanation} setExplanation={setExplanation} />
      <Grid justifyContent={'end'} container>
        <Button style={{ margin: '1em' }} variant='contained' onClick={createMonster}>作成</Button>
      </Grid>
    </div>
  );
};

export default MonsterCreate;