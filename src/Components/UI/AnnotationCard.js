import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const PaperStyle = styled(Paper)`
  width: 150px;
  padding: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  &:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  }
  cursor: pointer;
`;

const AnnotationCard = (props) => {
  return (
    <PaperStyle>
      <Typography variant="h6" component="h2" style={{ fontSize: "20px" }}>
        {props.title}
      </Typography>
      <Typography style={{ fontSize: "12px" }}>{props.text}</Typography>
    </PaperStyle>
  );
};

export default AnnotationCard;
