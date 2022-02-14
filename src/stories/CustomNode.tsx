import React from "react";
import Typography from "@material-ui/core/Typography";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FolderIcon from "@material-ui/icons/Folder";
import ImageIcon from "@material-ui/icons/Image";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DescriptionIcon from "@material-ui/icons/Description";
import { NodeModel } from "~/types";
import { FileProperties } from "./types";

type Props = {
  node: NodeModel<FileProperties>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
};

const getIcon = (node: NodeModel<FileProperties>) => {
  if (node.droppable) {
    return <FolderIcon />;
  }

  switch (node.data?.fileType) {
    case "image":
      return <ImageIcon />;
    case "csv":
      return <ListAltIcon />;
    case "text":
      return <DescriptionIcon />;
    default:
      return null;
  }
};

export const CustomNode: React.FC<Props> = (props) => {
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  return (
    <div className="custom-node" style={{ paddingInlineStart: indent }}>
      <div className={`custom-node__arrow ${props.isOpen ? "is-open" : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div className="custom-node__type">{getIcon(props.node)}</div>
      <div className="custom-node__label">
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
