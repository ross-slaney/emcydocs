import type { DocsLayoutCommonProps } from "../types";
import DocsShell from "./DocsShell";

export default function DocsLayout(props: DocsLayoutCommonProps) {
  return <DocsShell {...props} />;
}
