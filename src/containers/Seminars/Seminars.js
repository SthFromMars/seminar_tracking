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
import {fetchSeminars, removeSeminar, clearError} from "../../state/seminars/seminarsActions";
import {fetchUsers} from "../../state/users/usersActions";
import {tableHeadLabels} from './utils/constants';
import Filters from "../../components/Filters/Filters";
import filterFormat from "./utils/filterFormat";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import CreateSeminar from "../CreateSeminar/CreateSeminar";
import Dialog from "@material-ui/core/Dialog";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import CircularProgress from "@material-ui/core/CircularProgress";

class Seminars extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            entryNr: 10,
            orderBy: 'end',
            orderDir: 'desc',
            isFiltersOpen: false,
            isCreateOpen: false,
            isDeleteOpen: false,
            isEdit: false,
            selectedSeminar: null,
            filterInfo: {
                filterByStartDate: false,
                filterByEndDate: false,
                filterByUser: !props.admin,
                startDateBegin: null,
                startDateEnd: null,
                endDateBegin: null,
                endDateEnd: null,
                users: props.admin ? [] : [props.user],
            },
        }
    }
    componentDidMount() {
        this.props.fetchSeminars(filterFormat(this.state));
        this.props.fetchUsers(
            [
                {label: 'startIndex', value: 0},
                {label: 'entryNr', value: 2147483640},
                {label: 'orderBy', value: 'name'},
                {label: 'orderDir', value: 'desc'},
            ]
        );
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
        this.props.fetchSeminars(filterFormat(newState));
        this.setState(newState);
    }
    handleSelectNrChange(e){
        const newState = this.state;
        newState.entryNr = e.target.value;
        newState.startIndex = 0;
        this.props.fetchSeminars(filterFormat(newState));
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
        this.props.fetchSeminars(filterFormat(newState));
        this.setState(newState);
    }
    handleFilterChange(e, field){
        const newState = this.state;
        if(!e) newState.filterInfo[field] = null;
        else if(e.target) newState.filterInfo[field] = e.target.value;
        else newState.filterInfo[field] = e;
        newState.startIndex = 0;
        this.props.fetchSeminars(filterFormat(newState));
        this.setState(newState);
    }
    handleFilterCheckboxChange(field){
        const newState = this.state;
        newState.filterInfo[field] = !newState.filterInfo[field];
        newState.startIndex = 0;
        this.props.fetchSeminars(filterFormat(newState));
        this.setState(newState);
    }

    render() {
        const { seminars, total, users, classes, removeSeminar, SeminarsIsLoading, UsersIsLoading, SeminarsError, UsersError, admin } = this.props;
        const { orderBy, orderDir, startIndex, entryNr, filterInfo, isFiltersOpen, isCreateOpen, isDeleteOpen, selectedSeminar, isEdit } = this.state;
        return (
            <div className={classes.mainDiv}>
                <Dialog open={isCreateOpen}>
                    <CreateSeminar
                        handleClose={() => this.setState({isCreateOpen: false})}
                        filterParams={filterFormat(this.state)}
                        users={users}
                        isEdit={isEdit}
                        seminar={selectedSeminar}
                    />
                </Dialog>
                <Dialog open={isDeleteOpen}>
                    <ConfirmDialog
                        handleClose={() => this.setState({isDeleteOpen: false})}
                        handleConfirm={() => {
                            removeSeminar(selectedSeminar.id, filterFormat(this.state));
                            this.setState({isDeleteOpen: false});
                        }}
                        getName={seminar => seminar.seminarName}
                        object={selectedSeminar}
                    />
                </Dialog>
                <div className={classes.buttonsDiv}>
                    <Button variant="contained" color="primary" onClick={() => {this.setState({isFiltersOpen: !isFiltersOpen})}} >Filtruoti</Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        this.props.clearError();
                        this.setState({
                            isCreateOpen: true,
                            isEdit: false,
                            selectedSeminar: null,
                        }
                )}} >Pridėti naują</Button>
                </div>
                <Collapse in={isFiltersOpen}>
                    <Filters
                        admin={admin}
                        isLoading={UsersIsLoading}
                        filterInfo={filterInfo}
                        error={UsersError}
                        users={users}
                        onChange={(e, field) => {this.handleFilterChange(e, field)}}
                        onCheckboxChange={(field) => {this.handleFilterCheckboxChange(field)}}
                    />
                </Collapse>
                {SeminarsError && (
                    <p className={classes.error}>{SeminarsError}</p>
                )}
                {SeminarsIsLoading ? (
                    <CircularProgress/>
                ) : (
                    <div>
                        <p>{`Bendra atrinktų seminarų trukmė: ${this.props.totalLength}`}</p>
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
                                {seminars.map(seminar => (
                                    <TableRow key={seminar.id}>
                                        <TableCell className={classes.tableCell}>{seminar.seminarName}</TableCell>
                                        <TableCell className={classes.tableCell}>{seminar.certNr}</TableCell>
                                        <TableCell className={classes.tableCell}>{seminar.length}</TableCell>
                                        <TableCell className={classes.tableCell}>{seminar.startDate}</TableCell>
                                        <TableCell className={classes.tableCell}>{seminar.endDate}</TableCell>
                                        <TableCell className={classes.tableCell}>{seminar.location}</TableCell>
                                        <TableCell className={classes.tableCell}>{seminar.userName}</TableCell>
                                        <TableCell className={classes.tableCellButton}>
                                            <IconButton
                                                className={classes.tableButton}
                                                onClick={() => {this.setState({
                                                    isCreateOpen: true,
                                                    isEdit: true,
                                                    selectedSeminar: seminar,
                                                })}}
                                            ><EditIcon/></IconButton>
                                            <IconButton
                                                className={classes.tableButton}
                                                onClick={() => {this.setState({
                                                    isDeleteOpen: true,
                                                    selectedSeminar: seminar,
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
    SeminarsIsLoading: state.seminars.isLoading,
    seminars: state.seminars.seminars,
    SeminarsError: state.seminars.error,
    total: state.seminars.total,
    totalLength: state.seminars.totalLength,
    UsersIsLoading: state.users.isLoading,
    users: state.users.users,
    UsersError: state.users.error,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    removeSeminar: (id, params) => dispatch(removeSeminar(id, params)),
    fetchSeminars: (params) => dispatch(fetchSeminars(params)),
    fetchUsers: (params) => dispatch(fetchUsers(params)),
    clearError: () => dispatch(clearError())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Seminars));