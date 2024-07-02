namespace PropTypes {
    type CustomText = {
        variant?: ( "300" | "300i" | "400" | "400i" | "500" | "500i" | "600" | "600i" | "700" | "700i" | "800" | "800i" | "900" | "900i" ),
        children: React.ReactNode,
        color?: CustomTextColorEnum
    }
    type CustomTextColorEnum = ('default' | 'primary')
}