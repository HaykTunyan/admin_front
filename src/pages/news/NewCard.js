import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Typography as MuiTypography,
} from "@material-ui/core";
import EditNewsModal from "../../modal/EditNewsModal";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const NewsCard = ({
  news,
  image,
  title,
  description,
  chip,
  status,
  onClickDelete,
  onClickPublish,
  getNews,
}) => {
  return (
    <Fragment>
      <Card>
        {image ? (
          <CardMedia
            image={`data:image/png;base64,${image}`}
            title="Contemplative Reptile"
          />
        ) : (
          <Box sx={{ height: "100%" }} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {chip}
          <Typography mb={4} color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <EditNewsModal news={news} getNews={getNews} />
          <Button size="small" color="primary" onClick={onClickDelete}>
            Delete
          </Button>
          {status === false && (
            <Button size="small" color="primary" onClick={onClickPublish}>
              Publish
            </Button>
          )}
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default NewsCard;
