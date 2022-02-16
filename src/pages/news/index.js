import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { spacing } from "@material-ui/system";
import {
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Box,
  Typography as MuiTypography,
  Card as MuiCard,
  CardContent,
  TablePagination,
} from "@material-ui/core";
import AddNewsModal from "../../modal/AddNewsModal";
import NewsCard from "./NewCard";
import {
  deleteNews_req,
  getNews_req,
  publishNews_req,
} from "../../api/newsAPI";
import moment from "moment";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Spacer = styled.div(spacing);

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

const NewsComponent = () => {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    getNews(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  async function getNews(page, rowsPerPage) {
    try {
      const response = await getNews_req(page, rowsPerPage);
      if (response) {
        setNewsList(response);
      }
    } catch (e) {}
  }

  async function deleteNews(id) {
    try {
      const response = await deleteNews_req(id);
      if (response) {
        getNews();
      }
    } catch (e) {}
  }

  async function publishNews(id) {
    const formData = new FormData();
    const status = true;

    formData.append("_id", id);
    formData.append("published", status);

    try {
      const response = await publishNews_req(formData);
      if (response) {
        getNews();
      }
    } catch (e) {}
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Fragment>
      <Helmet title="News" />
      <Grid container spacing={6}>
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
                <Spacer mx={1} />
                <Grid display="flex" alignItems="center">
                  <AddNewsModal getNews={getNews} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {newsList.news &&
          newsList.news.map((item) => (
            <Grid item xs={12} md={6} lg={6} xl={3} key={item.key}>
              <NewsCard
                news={item}
                image={item.image}
                title={item.title}
                description={item.description}
                chip={
                  <Chip
                    label={moment(item.date).format("DD/MM/YYYY")}
                    color="success"
                  />
                }
                status={item.status}
                onClickDelete={() => deleteNews(item._id)}
                onClickPublish={() => publishNews(item._id)}
                getNews={getNews}
              />
            </Grid>
          ))}
        <Grid item xs={12}>
          <Box
            mt={4}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* Pagination */}
            {newsList?.news && (
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={newsList?.allCount}
                rowsPerPage={newsList?.limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default NewsComponent;
