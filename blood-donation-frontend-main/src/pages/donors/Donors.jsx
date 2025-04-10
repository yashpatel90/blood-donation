import { useState } from "react"
import { Eye, Search, ChevronLeft, ChevronRight, User, Mail, MapPin, AlertCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

const Donors =()=> {
  // Sample user data (duplicated to have multiple rows)
  const sampleUser = {
    _id: "67d99382e8d0bd0309de7137",
    firstName: "Md Sayfur",
    lastName: "Rahman",
    gender: "male",
    healthInformation: "nothing",
    email: "sayfur1@gmail.com",
    phoneNumber: "01711111111",
    password: "$2b$10$.yvbi/jdajXywPTTQHyCdeyaktHy7RJvQ9zt.HU7eVU25aJwu5hg.",
    bloodType: "A-",
    role: "user",
    street: "abc, road",
    city: "Abc",
    state: "xyz",
    country: "United States",
    zipCode: "1212",
    dateOfBirth: "2005-06-08T00:00:00.000Z",
    emergencyContactName: "Sadqiqur Rahman",
    emergencyContactPhone: "01239238234",
    createdAt: "2025-03-18T15:38:42.123Z",
    updatedAt: "2025-03-18T15:38:42.123Z",
  }

  // Create more users with different data for demonstration
  const usersData = [
    sampleUser,
    {
      ...sampleUser,
      _id: "67d99382e8d0bd0309de7138",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      bloodType: "O+",
      phoneNumber: "01722222222",
      city: "New York",
      role: "admin",
    },
    {
      ...sampleUser,
      _id: "67d99382e8d0bd0309de7139",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      bloodType: "B+",
      phoneNumber: "01733333333",
      city: "Chicago",
      healthInformation: "Allergic to penicillin",
    },
    {
      ...sampleUser,
      _id: "67d99382e8d0bd0309de7140",
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.j@example.com",
      bloodType: "AB-",
      phoneNumber: "01744444444",
      city: "Los Angeles",
      gender: "female",
    },
    {
      ...sampleUser,
      _id: "67d99382e8d0bd0309de7141",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.b@example.com",
      bloodType: "O-",
      phoneNumber: "01755555555",
      city: "Houston",
    },
    {
      ...sampleUser,
      _id: "67d99382e8d0bd0309de7142",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.w@example.com",
      bloodType: "A+",
      phoneNumber: "01766666666",
      city: "Boston",
      gender: "female",
    },
    {
      ...sampleUser,
      _id: "67d99382e8d0bd0309de7143",
      firstName: "David",
      lastName: "Lee",
      email: "david.lee@example.com",
      bloodType: "B-",
      phoneNumber: "01777777777",
      city: "Seattle",
    },
    {
      ...sampleUser,
      _id: "67d99382e8d0bd0309de7144",
      firstName: "Lisa",
      lastName: "Garcia",
      email: "lisa.g@example.com",
      bloodType: "AB+",
      phoneNumber: "01788888888",
      city: "Miami",
      gender: "female",
    },
  ]

  // State for user details modal
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(5)

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBloodType, setFilterBloodType] = useState("all")

  // Handle opening the user details modal
  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  // Get blood type badge color
  const getBloodTypeBadgeColor = (bloodType) => {
    switch (bloodType) {
      case "A+":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "A-":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "B+":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "B-":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "AB+":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "AB-":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "O+":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "O-":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  // Filter users based on search term and blood type
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm)

    const matchesBloodType = filterBloodType === "all" || user.bloodType === filterBloodType

    return matchesSearch && matchesBloodType
  })

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen pt-16 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600">View and manage user accounts</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Filters</CardTitle>
            <CardDescription>Search and filter users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1) // Reset to first page on search
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select
                  value={filterBloodType}
                  onValueChange={(value) => {
                    setFilterBloodType(value)
                    setCurrentPage(1) // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blood Types</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length}{" "}
              users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No users found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">
                          {user.firstName} {user.lastName}
                          {user.role === "admin" && <Badge className="ml-2 bg-blue-100 text-blue-800">Admin</Badge>}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getBloodTypeBadgeColor(user.bloodType)}>{user.bloodType}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.phoneNumber}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.city}, {user.country}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(user)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > usersPerPage && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>Complete information about the selected user</DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-semibold text-lg flex items-center">
                      <User className="h-5 w-5 mr-2 text-red-600" /> Personal Information
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium capitalize">{selectedUser.gender}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{formatDate(selectedUser.dateOfBirth)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Blood Type</p>
                      <Badge className={getBloodTypeBadgeColor(selectedUser.bloodType)}>{selectedUser.bloodType}</Badge>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Health Information</p>
                      <p className="font-medium">
                        {selectedUser.healthInformation || "No health information provided"}
                      </p>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="border-b pb-2 pt-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-red-600" /> Account Information
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <Badge className={selectedUser.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-gray-100"}>
                        {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Account Created</p>
                      <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{formatDate(selectedUser.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-red-600" /> Contact Information
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedUser.email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{selectedUser.phoneNumber}</p>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="border-b pb-2 pt-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-red-600" /> Address
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Street</p>
                      <p className="font-medium">{selectedUser.street}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">City</p>
                        <p className="font-medium">{selectedUser.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">State</p>
                        <p className="font-medium">{selectedUser.state}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Country</p>
                        <p className="font-medium">{selectedUser.country}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Zip Code</p>
                        <p className="font-medium">{selectedUser.zipCode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="border-b pb-2 pt-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-red-600" /> Emergency Contact
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedUser.emergencyContactName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{selectedUser.emergencyContactPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">Edit User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}



export default Donors;