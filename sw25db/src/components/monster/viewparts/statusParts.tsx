type Props = {
  label: string,
  data?: any,
  data2?: any,
  data3?: boolean
}
export const MonsterViewStatusParts = (props: Props) => {
  const aStyle = { marginRight: '1em' }

  return (<>
    {
      props.data
        ? <a style={aStyle}>{`${props.label}：${props.data}${props.data3 ? `(${props.data + 7})` : ""
          }`}{
            props.data2 ? <>{`/${props.data2}`}</> : null
          }</a>
        : null
    }
  </>)
}