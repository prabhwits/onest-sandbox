import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ALL_DOMAINS } from "../utils";
import { FormControl, InputLabel, MenuItem, Tooltip } from "@mui/material";
import { useDomain } from "../utils/hooks";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 200;
const NAV_LINKS = [
	{
		name: "Sandbox",
		nested: false,
		path: "/sandbox",
	},
];

type NavButtonProps = {
	render: boolean;
	index?: string | number;
	link: {
		name: string;
		nested: boolean;
		path: string;
	};
	disabled?: boolean;
	disabledTooltip?: {
		show: boolean;
		text: string;
	};
};

const NavButton = ({
	render,
	index,
	link,
	disabled,
	disabledTooltip,
}: NavButtonProps) => {
	const location = useLocation();
	const theme = useTheme();

	const isExternal = link.path.startsWith("http");

	const component = isExternal ? "a" : RouterLink;
	const componentProps = isExternal
		? { href: link.path, target: "_blank", rel: "noopener noreferrer" }
		: { to: link.path };

	return (
		<Grow in={render} timeout={1000} key={"nonnested-nav-" + index}>
			<ListItem disablePadding key={index}>
				{disabledTooltip?.show ? (
					<Tooltip title={disabledTooltip?.text}>
						<Box sx={{ width: "100%" }}>
							<ListItemButton
								component={component}
								{...componentProps}
								disabled={disabled}
								selected={location.pathname === link.path}
								sx={{
									bgcolor: theme.palette.primary.dark,
									color: theme.palette.primary.contrastText,
									"&.Mui-selected": {
										backgroundColor: theme.palette.primary.light,
									},
									"&:hover": {
										color: theme.palette.common.black,
									},
								}}
							>
								<ListItemText primary={link.name} />
							</ListItemButton>
						</Box>
					</Tooltip>
				) : (
					<ListItemButton
						component={component}
						{...componentProps}
						disabled={disabled}
						selected={location.pathname === link.path}
						sx={{
							bgcolor: theme.palette.primary.dark,
							color: theme.palette.primary.contrastText,
							"&.Mui-selected": {
								backgroundColor: theme.palette.primary.light,
							},
							"&:hover": {
								color: theme.palette.common.black,
							},
						}}
					>
						<ListItemText primary={link.name} />
					</ListItemButton>
				)}
			</ListItem>
		</Grow>
	);
};

type CustomDrawerProps = {
	children: React.ReactNode;
};

export const CustomDrawer = ({ children }: CustomDrawerProps) => {
	const { domain, setDomain } = useDomain();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	const handleDomain = (event: SelectChangeEvent) => {
		setDomain(event.target.value.toLowerCase());
	};
	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<NavButton
				link={{
					name: "Home",
					nested: false,
					path: "/",
				}}
				render={mobileOpen}
			/>

			<Divider />
			<FormControl fullWidth sx={{ my: 1 }}>
				<InputLabel id="select-domain-label">
					{domain ? "" : "Select Domain"}
				</InputLabel>
				<Select
					labelId="select-domain-label"
					label="Domain"
					onChange={handleDomain}
				>
					{Object.keys(ALL_DOMAINS).map((domain: string, key: number) => (
						<MenuItem key={domain + key} value={domain}>
							{domain === "Subscription" ? "Subscription(Print Media)" : domain}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Divider />
			<List>
				{NAV_LINKS.map((link, index) => (
					<>
						<NavButton
							link={link}
							index={index}
							render={mobileOpen}
							disabled={domain.length === 0}
							disabledTooltip={
								domain.length === 0
									? {
										show: true,
										text: "Select Domain to get started",
									}
									: undefined
							}
						/>
						<Divider />
					</>
				))}
			</List>
			<Divider />
			<NavButton
				link={{
					name: "Sign Check",
					nested: false,
					path: "/sign-check",
				}}
				render={mobileOpen}
			/>
			<NavButton
				link={{
					name: "Analyse Transaction",
					nested: false,
					path: "/analyse",
				}}
				render={mobileOpen}
			/>
			<NavButton
				link={{
					name: "User Guide",
					nested: false,
					path: "/user-guide",
				}}
				render={mobileOpen}
			/>
			<NavButton
				link={{
					name: "Analytics",
					nested: false,
					path: "https://onest-mock-service.ondc.org/analytics/",
				}}
				render={mobileOpen}
			/>
		</div>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						ONDC ONEST Sandbox
					</Typography>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					PaperProps={{
						sx: {
							// backgroundColor: theme.palette.primary.dark,
							// color: theme.palette.primary.contrastText,
						},
					}}
					sx={{
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						<IconButton
							// sx={{ color: theme.palette.primary.contrastText }}
							onClick={handleDrawerToggle}
						>
							<MenuOpenIcon />
						</IconButton>
					</Box>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					// p: 3,
					minHeight: "100vh",
					// width: { sm: `calc(100% - ${drawerWidth}px)` },
					backgroundColor: theme.palette.grey[100],
				}}
			>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
