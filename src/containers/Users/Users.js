import React from 'react';
import { connect } from 'react-redux';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import ArrowBacIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import {fetchUsers, clearError, removeUser} from "../../state/users/usersActions";
import {tableHeadLabels} from './utils/constants';
import filterFormat from "./utils/filterFormat";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateUser from "../CreateUser/CreateUser";

class Users extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            entryNr: 10,
            orderBy: 'name',
            orderDir: 'desc',
            isFiltersOpen: false,
            isCreateOpen: false,
            isDeleteOpen: false,
            isEdit: false,
            selectedUser: null,
        }
    }
    componentDidMount() {
        this.props.fetchUsers(filterFormat(this.state));
    }
    handleSortChange(cellId){
        const { orderBy, orderDir } = this.state;
        const newState = this.state;
        if(orderBy===cellId) {
            newState.orderDir = orderDir === 'desc' ? 'asc' : 'desc';
        }
        else {
            newState.orderBy = cellId;
        }
        this.props.fetchUsers(filterFormat(newState));
        this.setState(newState);
    }
    handleSelectNrChange(e){
        const newState = this.state;
        newState.entryNr = e.target.value;
        newState.startIndex = 0;
        this.props.fetchUsers(filterFormat(newState));
        this.setState(newState);
    }
    handlePageChange(isForward){
        const newState = this.state;
        const { total } = this.props;
        if(isForward){
            if(newState.startIndex + newState.entryNr < total){
                newState.startIndex += newState.entryNr;
            }
        }
        else {
            if(newState.startIndex - newState.entryNr >= 0){
                newState.startIndex -= newState.entryNr;
            }
        }
        this.props.fetchUsers(filterFormat(newState));
        this.setState(newState);
    }

    render() {
        const { total, users, classes, removeUser, UsersIsLoading, SeminarsError, UsersError } = this.props;
        const { orderBy, orderDir, startIndex, entryNr, isCreateOpen, isDeleteOpen, selectedUser, isEdit } = this.state;
        return (
            <div className={classes.mainDiv}>
                <Dialog open={isCreateOpen}>
                    <CreateUser
                        handleClose={() => this.setState({isCreateOpen: false})}
                        filterParams={filterFormat(this.state)}
                        isEdit={isEdit}
                        user={selectedUser}
                    />
                </Dialog>
                <Dialog open={isDeleteOpen}>
                    <ConfirmDialog
                        user
                        handleClose={() => this.setState({isDeleteOpen: false})}
                        handleConfirm={() => {
                            removeUser(selectedUser.id, filterFormat(this.state));
                            this.setState({isDeleteOpen: false});
                        }}
                        getName={user => user.name}
                        object={selectedUser}
                    />
                </Dialog>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => {
                    this.props.clearError();
                    this.setState({
                        isCreateOpen: true,
                        isEdit: false,
                        selectedUser: null,
                    })}} >Pridėti naują</Button>
                {UsersError && (
                    <p className={classes.error}>{SeminarsError}</p>
                )}
                {UsersIsLoading ? (
                    <div><br/><CircularProgress/></div>
                ) : (
                    <div>
                        <Table className={classes.table}>
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    {tableHeadLabels.map(tableHeadLabel => {
                                        return (
                                            <TableCell key={tableHeadLabel.id} className={classes.tableHeadCell}>
                                                <TableSortLabel
                                                    active={tableHeadLabel.id === orderBy}
                                                    direction={orderDir}
                                                    onClick={() => this.handleSortChange(tableHeadLabel.id)}
                                                >
                                                    {tableHeadLabel.label}
                                                </TableSortLabel>
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell key={'actions'} className={classes.tableHeadCell}/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell className={classes.tableCell}>{user.name}</TableCell>
                                        <TableCell className={classes.tableCell}>{user.username}</TableCell>
                                        <TableCell className={classes.tableCell}>{user.privilege === 'ADMIN' ? 'Administratorius' : 'Vartotojas'}</TableCell>
                                        <TableCell className={classes.tableCellButton}>
                                            <IconButton
                                                className={classes.tableButton}
                                                onClick={() => {this.setState({
                                                    isCreateOpen: true,
                                                    isEdit: true,
                                                    selectedUser: user,
                                                })}}
                                            ><EditIcon/></IconButton>
                                            <IconButton
                                                className={classes.tableButton}
                                                onClick={() => {this.setState({
                                                    isDeleteOpen: true,
                                                    selectedUser: user,
                                                })}}
                                            ><DeleteIcon/></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className={classes.pagination}>
                            <div className={classes.paginationNoButtons}>
                                <p className={classes.paginationText}>Rodomos eilutės:</p>
                                <Select
                                    value={entryNr}
                                    onChange={(e) => this.handleSelectNrChange(e)}
                                    className={classes.paginationSelect}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={2147483647}>Visi</MenuItem>
                                </Select>
                                <p className={classes.paginationText}>{startIndex+1}-{startIndex+entryNr > total ? total : startIndex+entryNr} iš {total}</p>
                            </div>
                            <IconButton onClick={() => this.handlePageChange(false)} className={classes.paginationButton}>
                                <ArrowBacIcon />
                            </IconButton>
                            <IconButton onClick={() => this.handlePageChange(true)} className={classes.paginationButton}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    total: state.users.total,
    UsersIsLoading: state.users.isLoading,
    users: state.users.users,
    UsersError: state.users.error,
});

const mapDispatchToProps = (dispatch) => ({
    removeUser: (id, params) => dispatch(removeUser(id, params)),
    fetchUsers: (params) => dispatch(fetchUsers(params)),
    clearError: () => dispatch(clearError())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Users));