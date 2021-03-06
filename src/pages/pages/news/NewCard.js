import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Typography as MuiTypography,
} from "@material-ui/core";
import { Search as SearchIcon, Trash } from "react-feather";

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

const NewsCard = ({ image, title, description, chip }) => {
  return (
    <Fragment>
      <Card>
        {image ? (
          <CardMedia image={image} title="Contemplative Reptile" />
        ) : null}
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
          <EditNewsModal />
          <Button size="small" color="primary">
            View More
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default NewsCard;
