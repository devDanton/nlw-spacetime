const styles = {
  color: '#FF0000'
}

interface buttonProps {
  title: string
}

export function Button(props:buttonProps) {
  return(
    <p style={styles}>
      {props.title}
    </p>
  )
}