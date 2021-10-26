import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { spacing } from "@material-ui/system";
import {
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
  Card as MuiCard,
  CardContent,
  InputBase,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import NewsImage from "../../../assets/news_one.jpg";
import AddNewsModal from "../../modal/AddNewsModal";
import NewsCard from "./NewCard";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

// Moke Data.
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

const NewsComponent = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Helmet title="News" />

      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            News
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card xs={12}>
            <CardContent>
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                spacing={6}
              >
                <Grid item alignItems="center">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <Input placeholder={t("Search")} />
                  </Search>
                </Grid>
                <Grid display="flex" alignItems="center">
                  <AddNewsModal />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {NewsList.map((item) => (
          <Grid item xs={12} lg={6} xl={3} key={item.key}>
            <NewsCard
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
