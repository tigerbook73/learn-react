import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useDemoData } from "@mui/x-data-grid-generator/hooks";

export default function Test2() {
  const { data } = useDemoData({ dataSet: "Commodity", rowLength: 100 });

  return <DataGrid {...data} />;
}
