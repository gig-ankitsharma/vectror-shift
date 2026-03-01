import { Position } from "reactflow";
import { BaseNode } from "./BaseNode"

export const FileSaveNode =({id,data})=>{
    const handles= [{
        type:'target',position:Position.Left,id:`${id}-file`
    }];
   return <BaseNode title="File Save" handles={handles}>
    <div>File Save</div>
   </BaseNode>
}