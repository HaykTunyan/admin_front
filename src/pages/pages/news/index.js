import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import NewsImage from "../../../assets/news_one.jpg";
import AddNewsModal from "../../modal/AddNewsModal";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const NewsList = [
  {
    key: 0,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 1,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 2,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 3,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 4,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 5,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 6,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 7,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 8,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 9,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
  {
    key: 10,
    image: NewsImage,
    title: "IBM Donates Code Improvements to Open Source Hyperledger",
    description:
      "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM.",
    chip: <Chip label={"15/09/2021"} color="success" />,
  },
];

const News = ({ image, title, description, chip }) => {
  return (
    <Card>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
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
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

const NewsComponent = () => {
  return (
    <Fragment>
      <Helmet title="News" />

      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            News
          </Typography>
        </Grid>
        <Grid item>
          <AddNewsModal />
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        {NewsList.map((item) => (
          <Grid item xs={12} lg={6} xl={3} key={item.key}>
            <News
              image={item.image}
              title={item.title}
              description={item.description}
              chip={item.chip}
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default NewsComponent;
