import { useState } from 'react';
import { KeyboardArrowUp, KeyboardArrowRight } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { AccordionParts } from './accordionParts';

type Props = {
  monster: {
    race: string,
    main: monster.monster[],
    boss: monster.monster[],
    origin: monster.monster[]
  }
}
export const MyAccordion = (props: Props) => {
  const [expanded, setExpanded] = useState(false);
  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} onChange={toggleAccordion}>
      <AccordionSummary
        expandIcon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowRight />}
      >
        <Typography variant="h6">{props.monster.race}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionParts key={"main"} monsters={props.monster.main} />
        {props.monster.boss.length > 0 ? (
          <AccordionParts key={"boss"} monsters={props.monster.boss} tagName={"ボス級"} />
        ) : (<></>)}
        {props.monster.origin.length > 0 ? (
          <AccordionParts key={"original"} monsters={props.monster.origin} tagName={"オリジナル"} />
        ) : (<></>)}
      </AccordionDetails>
    </Accordion>
  );
};
