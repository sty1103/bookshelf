const style = {
  'padding': '8px 16px',
  'color': 'white',
  'background': '#28546a',
  'cursor': 'pointer',
  'outline': '0',
  'border': '0',
  'textDecoration': 'none',
  'fontSize': '1rem'
}

export default function Button({ text, click }: { text: string, click: () => void }) {
  return (
    <button style={style} onClick={click}>
      {text}
    </button>
  )
}