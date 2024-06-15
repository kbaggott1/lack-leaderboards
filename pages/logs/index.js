import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


export default function Logs() {
    const [logs, setLogs] = useState([]); // Store players data

    const [columnDefs] = useState([
        { headerName: "ID", field: "id", flex: 1},
        { headerName: "Editor", field: "edittedBy", flex: 1 },
        { headerName: "Target", field: "target", flex: 1 },
        { headerName: "Timestamp", field: "timestamp", flex: 1 },
        { headerName: "New Lack Count", field: "newCount", flex: 1 }
    ]);


    useEffect(() => {
        const fetchLogs = async () => {
          try {
            const response = await fetch('/api/logs');
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setLogs(data); // Update state with fetched data
          } catch (error) {
            console.error("Failed to fetch players:", error);
          }
        };
    
        fetchLogs();
      }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div className="ag-theme-alpine-dark" style={{ height: '100vh', width: '100%' }}>
            <AgGridReact
                rowData={logs}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10,50,100,250,500]}
            />
        </div>
    );
}