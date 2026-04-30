import { stringify } from "csv-stringify/sync";

export function responsesToCsv(rows: Record<string, any>[]) {
  return stringify(rows, { header: true });
}
