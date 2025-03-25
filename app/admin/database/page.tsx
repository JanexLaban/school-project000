"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function DatabaseAdminPage() {
  const [tables, setTables] = useState<string[]>([])
  const [selectedTable, setSelectedTable] = useState<string>("")
  const [tableData, setTableData] = useState<any[]>([])
  const [sqlQuery, setSqlQuery] = useState<string>("")
  const [queryResult, setQueryResult] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    // Fetch tables when component mounts
    fetchTables()
  }, [])

  useEffect(() => {
    // Fetch table data when selected table changes
    if (selectedTable) {
      fetchTableData(selectedTable)
    }
  }, [selectedTable])

  const fetchTables = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/database/tables")
      const data = await response.json()
      setTables(data.tables)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching tables:", error)
      toast({
        title: "Error",
        description: "Failed to fetch database tables",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const fetchTableData = async (tableName: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/database/tables/${tableName}`)
      const data = await response.json()
      setTableData(data.rows)
      setIsLoading(false)
    } catch (error) {
      console.error(`Error fetching data for table ${tableName}:`, error)
      toast({
        title: "Error",
        description: `Failed to fetch data for table ${tableName}`,
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      toast({
        title: "Error",
        description: "SQL query cannot be empty",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/database/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: sqlQuery }),
      })

      const data = await response.json()

      if (data.error) {
        toast({
          title: "SQL Error",
          description: data.error,
          variant: "destructive",
        })
      } else {
        setQueryResult(data.result)
        toast({
          title: "Query Executed",
          description: data.message || "Query executed successfully",
        })
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error executing query:", error)
      toast({
        title: "Error",
        description: "Failed to execute SQL query",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Database Administration</h1>

      <Tabs defaultValue="browse">
        <TabsList className="mb-4">
          <TabsTrigger value="browse">Browse Tables</TabsTrigger>
          <TabsTrigger value="query">SQL Query</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <Card>
            <CardHeader>
              <CardTitle>Database Tables</CardTitle>
              <CardDescription>Select a table to view its data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {tables.map((table) => (
                  <Button
                    key={table}
                    variant={selectedTable === table ? "default" : "outline"}
                    onClick={() => setSelectedTable(table)}
                  >
                    {table}
                  </Button>
                ))}
              </div>

              {selectedTable && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Table: {selectedTable}</h3>

                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : tableData.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            {Object.keys(tableData[0]).map((column) => (
                              <th key={column} className="border p-2 text-left">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                              {Object.values(row).map((value: any, colIndex) => (
                                <td key={colIndex} className="border p-2">
                                  {value === null ? <em className="text-muted-foreground">NULL</em> : String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-4">No data found in this table</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="query">
          <Card>
            <CardHeader>
              <CardTitle>Execute SQL Query</CardTitle>
              <CardDescription>Run SQL queries directly against the database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sql-query">SQL Query</Label>
                  <Textarea
                    id="sql-query"
                    placeholder="SELECT * FROM users;"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="font-mono h-32"
                  />
                </div>

                <Button onClick={executeQuery} disabled={isLoading}>
                  {isLoading ? "Executing..." : "Execute Query"}
                </Button>

                {queryResult.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Query Results</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            {Object.keys(queryResult[0]).map((column) => (
                              <th key={column} className="border p-2 text-left">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                              {Object.values(row).map((value: any, colIndex) => (
                                <td key={colIndex} className="border p-2">
                                  {value === null ? <em className="text-muted-foreground">NULL</em> : String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

