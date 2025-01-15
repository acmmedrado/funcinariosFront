import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

import {
  List,
  Card,
  Grid,
  Divider,
  TextField,
  Button,
  Typography,
  ListItemText,
  ListItem,
  ListItemIcon,
  IconButton
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

class Main extends Component {
  state = {
    funcionarios: [],
    newFuncionario: {
      id: null,
    },
  }

  blankForm() {
    return {
      id: null,
      nome: "",
      sobrenome: "",
      email: "",
      documento: ""
    };
  }

  componentDidMount() {
    this.loadFuncionarios();
  }

  loadFuncionarios = async () => {
    const response = await api.get(`/`);
    this.setState({ funcionarios: response.data })
    console.log(this.state.funcionarios)
  }

  handleDelete = async (funcionario) => {
    const response = await api.delete(`/${funcionario.id}`)
      .then(res => console.log(res.data));
    this.loadFuncionarios()
  }

  handleSubmit = async () => {
    const { newFuncionario } = this.state;

    if (newFuncionario.id === null) {
      const response = await api.post('', newFuncionario)
        .then(res => console.log(res.data));
    } else {
      const response = await api.put(`/${newFuncionario.id}`, newFuncionario)
      .then(res => console.log(res.data));    
    }
    this.loadFuncionarios();
    this.setState({ newFuncionario: this.blankForm() });
  }

  handleAlter = async (funcionario) => {
    this.setState({ newFuncionario: funcionario })
  }

  handleChange(event) {
    const { newFuncionario } = this.state;
    newFuncionario[event.target.name] = event.target.value;
    this.setState({ newFuncionario: newFuncionario })
    console.log("log de novo funcionario", newFuncionario)
  }

  render() {
    const { funcionarios, newFuncionario } = this.state;
    return (
      <React.Fragment>
        <Card style={{ margin: "20px" }}>
          <Grid container spacing={4} xs={12} style={{ marginTop: "20px", marginLeft: "5px" }}>
            <Grid item xs={4} >
              <Divider style={{ marginTop: "15px" }} />
            </Grid>
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "150%" }} color="textSecondary">
                Cadastro de funcionário
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Divider style={{ marginTop: "15px" }} />
            </Grid>
          </Grid>

          <Grid container spacing={2} xs={12} style={{ marginTop: "20px", justifyContent: "center" }} >
            <Grid item xs={2}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                label={"Nome"}
                name="nome"
                value={newFuncionario.nome}
                onChange={event => this.handleChange(event)}
              />
            </Grid>
            <Grid item xs={3} >
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                label={"Sobrenome"}
                name="sobrenome"
                value={newFuncionario.sobrenome}
                onChange={event => this.handleChange(event)}
              />
            </Grid>
            <Grid item xs={3} >
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                label={"E-mail"}
                name="email"
                value={newFuncionario.email}
                onChange={event => this.handleChange(event)}
              />
            </Grid>
            <Grid item xs={2} >
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                label={"Documento NIS - PIS"}
                name="documento"
                value={newFuncionario.documento}
                onChange={event => this.handleChange(event)}
              />
            </Grid>
            <Grid item xs={1}>
              <Button color="secondary" variant="contained" style={{ textTransform: "uppercase", width: "100%", height: 55 }} onClick={e => this.handleSubmit(e)}>
                <AddIcon/>
            </Button>
            </Grid>
          </Grid>

          <Grid container spacing={4} xs={12} style={{ marginTop: "20px", marginLeft: "5px", marginBottom: "10px"}}>
            <Grid item xs={4} >
              <Divider style={{ marginTop: "15px" }} />
            </Grid>
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "150%" }} color="textSecondary">
                Funcionários cadastrados
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Divider style={{ marginTop: "15px" }} />
            </Grid>
          </Grid>

          <List style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            {funcionarios.map((funcionario) => (
              <Card style={{ margin: "10px" }} key={funcionario.id} >
                <ListItem>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography style={{ textTransform: "uppercase" }} color="textPrimary">{funcionario.nome}</Typography>
                      </React.Fragment>
                    }
                    secondary="nome do funcionário"
                  />

                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography style={{ textTransform: "uppercase" }} color="textPrimary">{funcionario.sobrenome}</Typography>
                      </React.Fragment>
                    }
                    secondary="sobrenome do funcionário"
                  />

                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography style={{ textTransform: "uppercase" }} color="textPrimary">{funcionario.email}</Typography>
                      </React.Fragment>
                    }
                    secondary="e-mail do funcionário"
                  />
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography style={{ textTransform: "uppercase" }} color="textPrimary">{funcionario.documento}</Typography>
                      </React.Fragment>
                    }
                    secondary="Número de PIS - NIS"
                  />
                  <ListItemIcon>
                    <IconButton
                      edge="end"
                      onClick={e => this.handleAlter(funcionario)}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                    <IconButton
                      edge="end"
                      onClick={e => this.handleDelete(funcionario)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>


              </Card>
            ))}
          </List>
        </Card>
      </React.Fragment>
    )
  }
}
export default Main;
