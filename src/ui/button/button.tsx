type Props = {
  label: string;
};
function Button({ label }: Props) {
  return <button>{label}</button>;
}

export default Button;
