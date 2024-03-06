import * as CONSTANTS from "./widget.constants";
import { someHelperFunction } from "./widget.helpers";
import useStuff from "./use-stuff.hook";
import WidgetChild from "./widget-child";

/* Pretend there's a complex React component here! */
function Widget() {
  const name = useStuff(someHelperFunction());

  return (
    <>
      <h1>{CONSTANTS.WIDGET_TITLE}</h1>
      <WidgetChild name={name} />
    </>
  );
}
export default Widget;
