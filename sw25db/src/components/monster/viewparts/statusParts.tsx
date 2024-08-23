type Props = {
  label: string,
  data?: any,
  data2?: any,
  data3?: boolean
  hRace?: number
}
export const MonsterViewStatusParts = (props: Props) => {
  const aStyle = { marginRight: '1em' }

  return (<>
    {
      (props.data !== undefined && props.data !== null)
        ? <a style={aStyle}>{`${props.label}：${props.data + (props.hRace ? props.hRace : "")}${props.data3 ? `(${props.data + (props.hRace ? props.hRace : 0) + 7})` : ""
          }`}{
            props.data2 ? <>{`/${props.data2}`}</> : null
          }</a>
        : null
    }
  </>)
}