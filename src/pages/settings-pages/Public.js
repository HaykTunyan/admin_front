// const Public = () => {
//     return (
//       <Card mb={6}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Public info
//           </Typography>
  
//           <Grid container spacing={6}>
//             <Grid item md={8}>
//               <TextField
//                 id="username"
//                 label="Username"
//                 defaultValue="lucylavender"
//                 variant="outlined"
//                 fullWidth
//                 my={2}
//               />
  
//               <FormControl fullWidth my={2} variant="outlined">
//                 <TextField
//                   label="Biography"
//                   id="biography"
//                   multiline={true}
//                   rows={3}
//                   maxRows={4}
//                   variant="outlined"
//                   defaultValue="Lucy is a Freelance Writer and Social Media Manager who helps finance professionals and Fin-tech startups build an audience and get more paying clients online."
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item md={4}>
//               <CenteredContent>
//                 <BigAvatar
//                   alt="Remy Sharp"
//                   src="/static/img/avatars/avatar-1.jpg"
//                 />
//                 <input
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   id="raised-button-file"
//                   multiple
//                   type="file"
//                 />
//                 <label htmlFor="raised-button-file">
//                   <Button variant="contained" color="primary" component="span">
//                     <CloudUpload mr={2} /> Upload
//                   </Button>
  
//                   <Typography variant="caption" display="block" gutterBottom>
//                     For best results, use an image at least 128px by 128px in .jpg
//                     format
//                   </Typography>
//                 </label>
//               </CenteredContent>
//             </Grid>
//           </Grid>
  
//           <Button variant="contained" color="primary">
//             Save changes
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   };