import { Add, Close, Delete, Edit } from "@mui/icons-material";
import {
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  SelectChangeEvent,
  Box,
  TextField,
} from "@mui/material";
import React, { ChangeEventHandler, ReactNode } from "react";
import { Source, Unit } from "../../recoil/sources";

const fabStyle = {
  position: "fixed",
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

const SourcesPage: React.FC<SourcesPageProps> = ({
  sources,
  targetSource,
  isRegister,
  onChangeName,
  onChangeUnit,
  onChangeAmount,
  onChangeSaltWeight,
  register,
  modalOpen,
  registerOpen,
  modalClose,
  lineDelete,
  updateOpen,
}) => {
  return (
    <>
      <List>
        {sources.map((source, index) => (
          <ListItem key={index}>
            <ListItemText primary={source.name} />
            <IconButton color="inherit" onClick={() => updateOpen(source.name)}>
              <Edit />
            </IconButton>
            <IconButton color="inherit" onClick={() => lineDelete(source.name)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Fab
        sx={fabStyle}
        color="primary"
        aria-label="add"
        onClick={registerOpen}
      >
        <Add />
      </Fab>
      <Modal open={modalOpen} onClose={modalClose}>
        <Box sx={style}>
          <TextField
            id="standard-basic"
            label="調味料名"
            variant="standard"
            disabled={!isRegister}
            value={targetSource.name}
            onChange={onChangeName}
          />
          <Box sx={{ marginTop: 2 }}>
            <FormControl fullWidth variant="standard">
              <InputLabel>食塩相当量計測タイプ</InputLabel>
              <Select onChange={onChangeUnit} value={targetSource.unit}>
                <MenuItem value={Unit.Amount}>ml (量で測る)</MenuItem>
                <MenuItem value={Unit.Weight}>g (重さで測る)</MenuItem>
                <MenuItem value={Unit.Count}>個数 (個数で測る)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <InputLabel>食塩相当量を入力</InputLabel>
            {targetSource.unit === Unit.Amount && (
              <Box sx={{ marginTop: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <FormControl variant="standard" sx={{ width: "4em" }}>
                      <Input
                        value={targetSource.amount}
                        onChange={onChangeAmount}
                        type="number"
                        endAdornment={
                          <InputAdornment position="end">ml</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <InputLabel>あたり</InputLabel>
                  </Grid>
                  <Grid item>
                    <FormControl variant="standard" sx={{ width: "4em" }}>
                      <Input
                        value={targetSource.saltWeight}
                        onChange={onChangeSaltWeight}
                        type="number"
                        endAdornment={
                          <InputAdornment position="end">g</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
            {targetSource.unit === Unit.Weight && (
              <Box sx={{ marginTop: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <FormControl variant="standard" sx={{ width: "4em" }}>
                      <Input
                        value={targetSource.amount}
                        onChange={onChangeAmount}
                        type="number"
                        endAdornment={
                          <InputAdornment position="end">g</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <InputLabel>あたり</InputLabel>
                  </Grid>
                  <Grid item>
                    <FormControl variant="standard" sx={{ width: "4em" }}>
                      <Input
                        value={targetSource.saltWeight}
                        onChange={onChangeSaltWeight}
                        type="number"
                        endAdornment={
                          <InputAdornment position="end">g</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
            {targetSource.unit === Unit.Count && (
              <Box sx={{ marginTop: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <FormControl variant="standard" sx={{ width: "4em" }}>
                      <Input
                        value={targetSource.amount}
                        onChange={onChangeAmount}
                        type="number"
                        endAdornment={
                          <InputAdornment position="end">個</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <InputLabel>あたり</InputLabel>
                  </Grid>
                  <Grid item>
                    <FormControl variant="standard" sx={{ width: "4em" }}>
                      <Input
                        value={targetSource.saltWeight}
                        onChange={onChangeSaltWeight}
                        type="number"
                        endAdornment={
                          <InputAdornment position="end">g</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
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
    </>
  );
};

interface SourcesPageProps {
  sources: Array<Source>;
  targetSource: Source;
  isRegister: boolean;
  onChangeName: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onChangeUnit: (event: SelectChangeEvent<Unit>, child: ReactNode) => void;
  onChangeAmount: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onChangeSaltWeight: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  register: () => void;
  modalOpen: boolean;
  registerOpen: () => void;
  modalClose: () => void;
  lineDelete: (name: string) => void;
  updateOpen: (name: string) => void;
}

export default React.memo(SourcesPage);
