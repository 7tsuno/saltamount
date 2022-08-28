import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Close,
  Delete,
  Edit,
} from "@mui/icons-material";
import {
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  Grid,
  Button,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Input,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import Big from "big.js";
import React, { ChangeEventHandler, ReactNode, useState } from "react";
import { Item } from "../../recoil/items";
import { Source, Unit } from "../../recoil/sources";

const fabStyle = {
  position: "absolute",
  bottom: 80,
  right: 16,
};

const closeStyle = {
  position: "absolute",
  bottom: 16,
  left: 16,
};

const registerStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const Items = styled("div")({
  height: "calc(100vh - 270px)",
  overflow: "auto",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95vw",
  maxWidth: "600px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  paddingBottom: 10,
};

const IndexPage: React.FC<IndexPageProps> = ({
  sources,
  items,
  targetItem,
  onChangeTableSpoon,
  upTableSpoon,
  downTableSpoon,
  onChangeTeaSpoon,
  upTeaSpoon,
  downTeaSpoon,
  onChangeCup,
  upCup,
  downCup,
  onChangeAmount,
  onChangeWeight,
  onChangeCount,
  upCount,
  downCount,
  isRegister,
  register,
  modalOpen,
  registerOpen,
  modalClose,
  lineDelete,
  updateOpen,
  allDelete,
  onChangeSource,
  saltAmount,
}) => {
  return (
    <>
      {sources.length === 0 ? (
        <Typography sx={{ margin: "2em" }}>
          先に調味料を登録してください
        </Typography>
      ) : (
        <>
          <Items>
            <List>
              {items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.source.name} />
                  <ListItemText
                    primary={item.saltAmount + "g　"}
                    sx={{ textAlign: "right" }}
                  />
                  <IconButton
                    color="inherit"
                    onClick={() => updateOpen(item.source.name)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={() => lineDelete(item.source.name)}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Items>
          <Grid container sx={{ padding: (theme) => theme.spacing(2) }}>
            <Grid item xs={6}>
              <Typography sx={{ margin: (theme) => theme.spacing(0.5) }}>
                合計 :{" "}
                {items.length === 0
                  ? 0
                  : items
                      .map((item) => item.saltAmount)
                      .reduce((a, b) => new Big(a).add(b).toNumber())}
                g
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                color="error"
                variant="contained"
                startIcon={<Delete />}
                sx={{ float: "right" }}
                onClick={allDelete}
              >
                すべて削除
              </Button>
            </Grid>
          </Grid>
          <Fab
            sx={fabStyle}
            color="primary"
            aria-label="add"
            onClick={registerOpen}
            disabled={
              sources.filter(
                (source) =>
                  !items.find((item) => item.source.name === source.name)
              ).length === 0
            }
          >
            <Add />
          </Fab>
          {targetItem.source && (
            <Modal open={modalOpen} onClose={modalClose}>
              <Box sx={style}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>調味料</InputLabel>
                  <Select
                    disabled={!isRegister}
                    value={targetItem.source.name}
                    onChange={onChangeSource}
                  >
                    {sources
                      .filter(
                        (source) =>
                          !items.find(
                            (item) => item.source.name === source.name
                          ) || source.name === targetItem.source.name
                      )
                      .map((source, index) => (
                        <MenuItem key={index} value={source.name}>
                          {source.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {targetItem.source.unit === Unit.Amount && (
                  <Box sx={{ marginTop: 2 }}>
                    <Box sx={{ marginTop: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <InputLabel>大さじ</InputLabel>
                        </Grid>
                        <Grid item>
                          <FormControl variant="standard" sx={{ width: "6em" }}>
                            <Input
                              type="number"
                              value={targetItem.tableSpoon}
                              onChange={onChangeTableSpoon}
                              endAdornment={
                                <InputAdornment position="end">
                                  杯
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={upTableSpoon}>
                            <ArrowUpward />
                          </IconButton>
                          <IconButton onClick={downTableSpoon}>
                            <ArrowDownward />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <InputLabel>小さじ</InputLabel>
                        </Grid>
                        <Grid item>
                          <FormControl variant="standard" sx={{ width: "6em" }}>
                            <Input
                              type="number"
                              value={targetItem.teaSpoon}
                              onChange={onChangeTeaSpoon}
                              endAdornment={
                                <InputAdornment position="end">
                                  杯
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={upTeaSpoon}>
                            <ArrowUpward />
                          </IconButton>
                          <IconButton onClick={downTeaSpoon}>
                            <ArrowDownward />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <InputLabel>カップ</InputLabel>
                        </Grid>
                        <Grid item>
                          <FormControl variant="standard" sx={{ width: "6em" }}>
                            <Input
                              type="number"
                              value={targetItem.cup}
                              onChange={onChangeCup}
                              endAdornment={
                                <InputAdornment position="end">
                                  カップ
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={upCup}>
                            <ArrowUpward />
                          </IconButton>
                          <IconButton onClick={downCup}>
                            <ArrowDownward />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <InputLabel>計測量</InputLabel>
                        </Grid>
                        <Grid item>
                          <FormControl variant="standard" sx={{ width: "6em" }}>
                            <Input
                              type="number"
                              value={targetItem.amount}
                              onChange={onChangeAmount}
                              endAdornment={
                                <InputAdornment position="end">
                                  ml
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}

                {targetItem.source.unit === Unit.Weight && (
                  <Box sx={{ marginTop: 2 }}>
                    <Box sx={{ marginTop: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <InputLabel>重さ</InputLabel>
                        </Grid>
                        <Grid item>
                          <FormControl variant="standard" sx={{ width: "6em" }}>
                            <Input
                              type="number"
                              value={targetItem.weight}
                              onChange={onChangeWeight}
                              endAdornment={
                                <InputAdornment position="end">
                                  g
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}

                {targetItem.source.unit === Unit.Count && (
                  <Box sx={{ marginTop: 2 }}>
                    <Box sx={{ marginTop: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <InputLabel>個数</InputLabel>
                        </Grid>
                        <Grid item>
                          <FormControl variant="standard" sx={{ width: "6em" }}>
                            <Input
                              type="number"
                              value={targetItem.count}
                              onChange={onChangeCount}
                              endAdornment={
                                <InputAdornment position="end">
                                  個
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={upCount}>
                            <ArrowUpward />
                          </IconButton>
                          <IconButton onClick={downCount}>
                            <ArrowDownward />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}
                <Box sx={{ marginTop: 2, textAlign: "right" }}>
                  <Typography sx={{ margin: (theme) => theme.spacing(0.5) }}>
                    合計 :{saltAmount}g
                  </Typography>
                </Box>
                <IconButton sx={closeStyle} onClick={modalClose}>
                  <Close />
                </IconButton>
                {isRegister && (
                  <Button
                    color="primary"
                    variant="contained"
                    sx={registerStyle}
                    onClick={register}
                  >
                    追加する
                  </Button>
                )}
                {!isRegister && (
                  <Button
                    color="primary"
                    variant="contained"
                    sx={registerStyle}
                    onClick={register}
                  >
                    変更する
                  </Button>
                )}
              </Box>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

interface IndexPageProps {
  sources: Array<Source>;
  items: Array<Item>;
  targetItem: Item;
  onChangeSource: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  onChangeTableSpoon: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  upTableSpoon: () => void;
  downTableSpoon: () => void;
  onChangeTeaSpoon: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  upTeaSpoon: () => void;
  downTeaSpoon: () => void;
  onChangeCup: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  upCup: () => void;
  downCup: () => void;
  onChangeAmount: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onChangeWeight: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onChangeCount: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  upCount: () => void;
  downCount: () => void;
  isRegister: boolean;
  register: () => void;
  modalOpen: boolean;
  registerOpen: () => void;
  modalClose: () => void;
  lineDelete: (name: string) => void;
  updateOpen: (name: string) => void;
  allDelete: () => void;
  saltAmount: number;
}

export default React.memo(IndexPage);
