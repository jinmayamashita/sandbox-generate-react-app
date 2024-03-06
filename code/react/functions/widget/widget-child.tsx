type Props = {
  name: string;
};

/* A sub-component used exclusively by widget.tsx (or other components in this directory). */
function WidgetChild({ name }: Props) {
  return <>{name}</>;
}
export default WidgetChild;
