import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            testData: [{
                test1: 'notDB1',
                test2: 123,
            },
                {
                    test1: 'notDB2',
                    test2: 456,
                },
            ],
            error: null,
        }
    }
    componentDidMount() {
        const fetchTestData = async (context) => {
            try {
                const response = await fetch('http://mokslas.tech/dev/api/requests/getTestData.php');
                const responseJSON = await response.json();
                return {
                    testData: responseJSON.testData,
                    error: null,
                }
            } catch (e) {
                const error = e && e.message ? e.message : 'System error';
                alert(`error: ${error}`);
                return {
                    testData: null,
                    error: error
                };
            }
        };
        fetchTestData(this).then((state) => {
            this.setState(state);
        });
    }
    render() {
        const {testData} = this.state;
        return(
            <div>
                <h1>Test</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>TEST1(string)</TableCell>
                            <TableCell>TEST2(int)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testData.map(data => (
                            <TableRow key={data.test1}>
                                <TableCell>{data.test1}</TableCell>
                                <TableCell>{data.test2}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Test;
