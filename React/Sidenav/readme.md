### How to use
# How to use
This is a reusable react component for sidebar
* First call the component
* Make an object to define navigation bar

Example Code

* Props structure
```javascript
const NavItems = {
    firstItems: [
        {
            name: "dashboard",
            label: "Dashboard",         
            icon: <DashboardIcon />
        },
        {
            name: "personal_informations",
            label: "Personal Informations",
            url: "/personal_information", 
            icon: <PersonIcon />
        },
        {
            name: "projects",
            label: "Projects",
            icon: <AccountTreeIcon />,
            subItems: [
                { name: "manage_projects", label: "Manage Projects"},
                { name: "add_projects", label: "Add Projects", url: "/projects/add"},
                { name: "manage_types", label: "Manage Types"}
            ]
        },
        {
            name: "employment",
            label: "Employment",
            icon: <WorkIcon />,
            subItems: [
                { name: "manage_works", label: "Manage Projects"},
                { name: "add_work", label: "Add Projects"}
            ]
        },
        {
            name: "gallery",
            label: "Gallery",
            icon: <CollectionsIcon />
        }                                             
    ]
}
```
* Calling the component
```javascript
<Sidenav items={NavItems} >
    content
</Sidenav>
```