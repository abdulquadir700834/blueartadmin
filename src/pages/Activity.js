import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ActivityTableData from "../data/activity/activity-data.json";

const Activity = () => {

    const columns = [
        {
            dataField: 'item',
            text: 'Item',
            sort: true
        },
        {
            dataField: 'price',
            text: 'Price'
        },
        {
            dataField: 'author',
            text: 'Author'
        },
        {
            dataField: 'event',
            text: 'Event'
        },
        {
            dataField: 'time',
            text: 'Time',
            sort: true
        }
    ];

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        paginationSize: 5,
        disablePageTitle: true,
        hideSizePerPage: true
    });

    return(
        <>
                <div className="container">
                    {/* Activity Table */}
                    <div className="activity-table">
                        <BootstrapTable 
                            keyField="id" 
                            data={ActivityTableData} 
                            columns={columns} 
                            pagination={pagination} 
                            bootstrap4
                        />
                    </div>
                </div>
        </>
    )
}

export default Activity;