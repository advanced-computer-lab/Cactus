// ___________MIDDLEWARE____________
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router";

// ___________MATERIAL UI____________
import { Box } from "@mui/system";
import {
    IconButton,
    Typography,
    Tab,
    Snackbar,
    Tabs,
    Button,
    Grid,
    ButtonGroup,
    Divider,
    Paper,
    TextField,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    DialogContentText,
    Collapse,
    Backdrop,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Tooltip,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

// ___________MATERIAL UI ICONS____________
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PasswordIcon from "@mui/icons-material/Password";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WcIcon from "@mui/icons-material/Wc";
import RestoreIcon from "@mui/icons-material/Restore";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CloseIcon from "@mui/icons-material/Close";
import Search from '../../Views/User/Logic/Search'

// ___________COMPONENTS____________
import UserNavBar from "../../Components/User/UserNavBar";
import { UserContext } from "../../Context/UserContext";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

var recentlyReservedDepB = [];
var recentlyReservedDepE = [];

var economySplicedDep = [];

var recentlyReservedRetB = [];
var recentlyReservedRetE = [];

var economySplicedRet = [];

export default function UserInfo() {
    const history = useHistory();
    const { handleEditDepFlight } = Search();
    // user context
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    const [openSnack, setOpenSnack] = useState(false)
    var maleDisabled = false;
    var femaleDisabled = true;
    if (loggedUser) {
        if (loggedUser.gender === "Male") {
            maleDisabled = false;
            femaleDisabled = true;
        } else {
            maleDisabled = true;
            femaleDisabled = false;
        }
    }

    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [openDepSeats, setOpenDepSeats] = useState(false);
    const [openRetSeats, setOpenRetSeats] = useState(false);
    const [email, setEmail] = useState(loggedUser.email);
    const [emailVal, setEmailVal] = useState({ error: false, label: "Email" })
    const [fName, setFName] = useState(loggedUser.firstName);
    const [fNameVal, setFNameVal] = useState({ error: false, label: "First Name" })
    const [lName, setLName] = useState(loggedUser.lastName);
    const [lNameVal, setLNameVal] = useState({ error: false, label: "Last Name" })
    const [cc1, setCc1] = useState(loggedUser.countryCode[0]);
    const [cc1Val, setCc1Val] = useState({ error: false, label: "Area Code 1" })

    const [phone1Val, setPhone1Val] = useState({ error: false, label: "Phone 1" })

    const [passportVal, setPassportVal] = useState({ error: false, label: "Passport" })
    const [countryVal, setCountryVal] = useState({ error: false, label: "Country/Region" })
    const [cityVal, setCityVal] = useState({ error: false, label: "City" })
    const [cc2, setCc2] = useState(() => {
        if (loggedUser.countryCode.length > 1) return loggedUser.countryCode[1];
        else return "";
    });
    const [cc3, setCc3] = useState(() => {
        if (loggedUser.countryCode.length > 2) return loggedUser.countryCode[2];
        else return "";
    });
    const [phone1, setPhone1] = useState(loggedUser.telephones[0]);
    const [phone2, setPhone2] = useState(() => {
        if (loggedUser.telephones.length > 1) return loggedUser.telephones[1];
        else return "";
    });
    const [phone3, setPhone3] = useState(() => {
        if (loggedUser.telephones.length > 2) return loggedUser.telephones[2];
        else return "";
    });
    const [passport, setPassport] = useState(loggedUser.passportNumber);
    const [country, setCountry] = useState(loggedUser.homeAddress.country);
    const [city, setCity] = useState(loggedUser.homeAddress.city);
    const open = Boolean(anchorEl);
    const [departureFlight, setDepartureFlight] = useState()
    const [returnFlight, setReturnFlight] = useState()
    const [economyRetSeats, setEconomyRetSeats] = useState([]);
    const [businessRetSeats, setBusinessRetSeats] = useState([]);
    const [economyDepSeats, setEconomyDepSeats] = useState([]);
    const [businessDepSeats, setBusinessDepSeats] = useState([]);
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const [seats, setSeats] = useState(0);
    const [cabin, setCabin] = useState("");
    const [depSeats, setDepSeats] = useState([]);
    const [retSeats, setRetSeats] = useState([]);
    const [depFlightMap, setDepFlightMap] = useState([]);
    const [retFlightMap, setRetFlightMap] = useState([]);
    const [reservationID, setReservationID] = useState()
    const [update, setUpdate] = useState(false);
    const [editing, setEditing] = useState(false)
    const [updateUser, setUpdateUser] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFetching(true);
        setUpdate((prevState) => !prevState);
    };
    //fetch user reservations
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                let res = await axios.post("/Users/getAllReservations", {
                    username: loggedUser.username,
                });
                let data = await res.data;
                setReservations(data);
                setFetching(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchReservations();
        console.log("i re-rendered");
    }, [update]);
    //fetch user info
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                let res = await axios.post("/Users/getUserInfo", { userId: loggedUser._id });
                let data = await res.data;
                setLoggedUser(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserInfo();
    }, [updateUser])
    const [openDialog, setOpenDialog] = useState(false);

    const emailChange = (e) => {
        setEmail(e.target.value);
    };
    const fnameChange = (e) => {
        setFName(e.target.value);
    };
    const lnameChange = (e) => {
        setLName(e.target.value);
    };
    const passportChange = (e) => {
        setPassport(e.target.value);
    };
    const countryChange = (e) => {
        setCountry(e.target.value);
    };
    const cityChange = (e) => {
        setCity(e.target.value);
    };
    const p1Change = (e) => {
        setPhone1(e.target.value);
    };
    const cc1Change = (e) => {
        setCc1(e.target.value);
    };
    const p2Change = (e) => {
        setPhone2(e.target.value);
    };
    const cc2Change = (e) => {
        setCc2(e.target.value);
    };
    const p3Change = (e) => {
        setPhone3(e.target.value);
    };
    const cc3Change = (e) => {
        setCc3(e.target.value);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleCloseSnack = () => {
        setOpenSnack(false);
    }

    const UpdateUser = () => {
        setEditing(true)
        const phones = [phone1];
        const codes = [cc1];
        if (phone2 !== "" && cc2 !== "") {
            phones.push(phone2);
            codes.push(cc2);
        }
        if (phone3 !== "" && cc3 !== "") {
            phones.push(phone3);
            codes.push(cc3);
        }
        const data = {
            email: email,
            firstName: fName,
            lastName: lName,
            passportNumber: passport,
            telephones: phones,
            countryCode: codes,
            country: country,
            city: city,
            password: loggedUser.password,
            _id: loggedUser._id,
            reservations: loggedUser.reservations,
        };
        var isError = false;
        if (email === "") {
            setEmailVal({ error: true, label: "This field is required" })
            isError = true
        } else {
            setEmailVal({ error: false, label: "Email" })
        }
        if (fName === "") {
            setFNameVal({ error: true, label: "This field is required" })
            isError = true
        } else {
            setFNameVal({ error: false, label: "First Name" })
        }
        if (lName === "") {
            setLNameVal({ error: true, label: "This field is required" })
            isError = true
        } else {
            setLNameVal({ error: false, label: "Last Name" })
        }
        if (phone1 === "") {
            setPhone1Val({ error: true, label: "This field is required" })
            isError = true
        } else {
            setPhone1Val({ error: false, label: "Phone" })
        }
        if (cc1 === "") {
            setCc1Val({ error: true, label: "This field is required" })
            isError = true
        } else {
            setCc1Val({ error: false, label: "Area Code" })
        }
        if (passport === "") {
            setPassportVal({ error: true, label: "This field is required" })
            isError = true
        } else {
            setPhone1Val({ error: false, label: "First Name" })
        }
        if (country === "") {
            setCountryVal({ error: true, label: "This field is required" })
            isError = true
        } else {
            setCountryVal({ error: false, label: "Country/Region" })
        }
        if (city === "") {
            setCityVal({ error: true, label: "This field is required" })
            isError = true
        } else {
            setCityVal({ error: false, label: "City" })
        }
        if (isError) {
            setEditing(false)
            return
        }
        console.log(data);
        axios
            .put("/Users/updateUser", data)
            .then((response) => {
                console.log(response);
                setEditing(false)
                setOpenSnack(true);
                setUpdateUser((prevState) => !prevState);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [success, setSuccess] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);

    const handlecancelBooking = (e) => {
        e.preventDefault();
        console.log("id: ", reservationID._id)
        const data = {
            username: loggedUser.username,
            reservationId: reservationID._id,
            title: loggedUser.title,
            refundedAmount:
                (reservationID.departurePrice + reservationID.returnPrice) * reservationID.seats,
            email: loggedUser.email,
            firstName: loggedUser.firstName,
        };
        console.log(data);
        setOpenDialog(false)
        setBackdropOpen(true);
        axios
            .post("/Users/cancelReservation", data)
            .then((res) => {
                console.log(res.data);
                setSuccess(true);
                setBackdropOpen(false);
                setUpdate((prevState) => !prevState);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleOpenDepSeats = (
        e,
        reserve,
        depFlight,
        retFlight
    ) => {
        setReservationID(reserve)
        setDepartureFlight(depFlight)
        setReturnFlight(retFlight)
        setOpenDepSeats(true);
        let tempEconomy = depFlight.economyMap;
        let tempBusiness = depFlight.businessMap;
        setNumberOfSeats(reserve.seats);
        setSeats(reserve.seats);
        setCabin(reserve.cabin);
        if (reserve.cabin === "economy") {
            const reservedSeats = [];
            for (let i = 0; i < reserve.depSeatNumbers.length; i++) {
                const found = depFlight.economyMap.find((seat) => {
                    return seat.number === reserve.depSeatNumbers[i];
                });
                reservedSeats.push(found.number - 1);
            }
            recentlyReservedDepE = reservedSeats;
            for (let j = 0; j < recentlyReservedDepE.length; j++) {
                tempEconomy[recentlyReservedDepE[j]].reserved = false;
            }
            setEconomyDepSeats(tempEconomy);
            recentlyReservedDepE = [];
            economySplicedDep = [];
            for (let i = 0; i < economyDepSeats.length; i += 10) {
                let temp1 = [];
                let temp2 = [];
                let temp3 = [];
                for (let j = i; j < i + 3; j++) {
                    temp1.push(economyDepSeats[j]);
                }
                for (let k = i + 3; k < i + 3 + 4; k++) {
                    temp2.push(economyDepSeats[k]);
                }
                for (let l = i + 7; l < i + 7 + 3; l++) {
                    temp3.push(economyDepSeats[l]);
                }
                economySplicedDep.push(temp1);
                economySplicedDep.push(temp2);
                economySplicedDep.push(temp3);
            }
        } else {
            const reservedSeats = [];
            for (let i = 0; i < reserve.depSeatNumbers.length; i++) {
                const found = depFlight.businessMap.find((seat) => {
                    return seat.number === reserve.depSeatNumbers[i];
                });
                reservedSeats.push(found.number - 1);
            }
            recentlyReservedDepB = reservedSeats;
            for (let j = 0; j < recentlyReservedDepB.length; j++) {
                tempBusiness[recentlyReservedDepB[j]].reserved = false;
            }
            setBusinessDepSeats(tempBusiness);
            recentlyReservedDepB = [];
        }

    };
    const handleCancelDialog = (e, reservation) => {
        setOpenDialog(true)
        setReservationID(reservation)
    }
    const handleDepSeatsChanged = (e) => {
        e.preventDefault()
        var tmp = depSeats;
        for (let i = 0; i < tmp.length; i++) {
            tmp[i] = tmp[i] + 1;
        }
        var data = {}

        data.username = loggedUser.username
        data.depSeats = tmp
        data.retSeats = reservationID.retSeatNumbers
        data.reservationId = reservationID._id
        data.depFlightMap = depFlightMap
        if (reservationID.cabin === 'business') {
            data.retFlightMap = returnFlight.businessMap
        }
        else {
            data.retFlightMap = returnFlight.economyMap
        }
        console.log(data)
        setOpenDepSeats(false);
        axios.post('/Users/updateReservation', data)
            .then(() => {
                setUpdate((prevState) => !prevState);
            }
            )
    };

    const handleSelectedDepSeat = (e, params) => {
        e.preventDefault();
        if (!(numberOfSeats === 0)) {
            setNumberOfSeats(numberOfSeats - 1);
            if (cabin === "business") {
                let seat = businessDepSeats.find((o, i) => {
                    if (o.number === params) {
                        businessDepSeats[i] = {
                            number: params,
                            reserved: true,
                            _id: o._id,
                        };
                        recentlyReservedDepB.push(i);
                        setBusinessDepSeats(businessDepSeats);
                        setDepSeats(recentlyReservedDepB);
                        setDepFlightMap(businessDepSeats);
                        return true;
                    }
                });
            } else {
                const flatArray = economySplicedDep.flat(1);
                let seat = flatArray.find((o, i) => {
                    if (o.number === params) {
                        flatArray[i] = { number: params, reserved: true, _id: o._id };
                        recentlyReservedDepE.push(i);
                        setDepSeats(recentlyReservedDepE);
                        setDepFlightMap(economyDepSeats);
                        return true;
                    }
                });
                economySplicedDep = [];
                let temp1 = [];
                let temp2 = [];
                let temp3 = [];
                for (let i = 0; i < flatArray.length; i += 10) {
                    temp1 = [];
                    temp2 = [];
                    temp3 = [];
                    for (let j = i; j < i + 3; j++) {
                        temp1.push(flatArray[j]);
                        console.log("temp1: ", temp1);
                    }
                    for (let k = i + 3; k < i + 3 + 4; k++) {
                        temp2.push(flatArray[k]);
                        console.log("temp2: ", temp2);
                    }
                    for (let l = i + 7; l < i + 7 + 3; l++) {
                        temp3.push(flatArray[l]);
                        console.log("temp3: ", temp3);
                    }
                    economySplicedDep.push(temp1);
                    economySplicedDep.push(temp2);
                    economySplicedDep.push(temp3);
                }
            }
        }
    };
    const handleSelectedRetSeat = (e, params) => {
        e.preventDefault();
        if (!(numberOfSeats === 0)) {
            setNumberOfSeats(numberOfSeats - 1);
            if (cabin === "business") {
                let seat = businessRetSeats.find((o, i) => {
                    if (o.number === params) {
                        businessRetSeats[i] = {
                            number: params,
                            reserved: true,
                            _id: o._id,
                        };
                        recentlyReservedRetB.push(i);
                        setBusinessRetSeats(businessRetSeats);
                        setRetSeats(recentlyReservedRetB);
                        setRetFlightMap(businessRetSeats);
                        return true;
                    }
                });
            } else {
                const flatArray = economySplicedRet.flat(1);
                let seat = flatArray.find((o, i) => {
                    if (o.number === params) {
                        flatArray[i] = { number: params, reserved: true, _id: o._id };
                        recentlyReservedRetE.push(i);
                        setRetSeats(recentlyReservedRetE);
                        setRetFlightMap(economyRetSeats);
                        return true;
                    }
                });
                economySplicedRet = [];
                let temp1 = [];
                let temp2 = [];
                let temp3 = [];
                for (let i = 0; i < flatArray.length; i += 10) {
                    temp1 = [];
                    temp2 = [];
                    temp3 = [];
                    for (let j = i; j < i + 3; j++) {
                        temp1.push(flatArray[j]);
                        console.log("temp1: ", temp1);
                    }
                    for (let k = i + 3; k < i + 3 + 4; k++) {
                        temp2.push(flatArray[k]);
                        console.log("temp2: ", temp2);
                    }
                    for (let l = i + 7; l < i + 7 + 3; l++) {
                        temp3.push(flatArray[l]);
                        console.log("temp3: ", temp3);
                    }
                    economySplicedRet.push(temp1);
                    economySplicedRet.push(temp2);
                    economySplicedRet.push(temp3);
                }
            }
        }
    };
    const handleResetRetSeats = (e) => {
        e.preventDefault();
        if (cabin === "business") {
            for (let index = 0; index < recentlyReservedRetB.length; index++) {
                businessRetSeats[recentlyReservedRetB[index]].reserved = false;
                setBusinessRetSeats(businessRetSeats);
            }
            recentlyReservedRetB = [];
            console.log(businessRetSeats);
        } else {
            const flatArray = economySplicedRet.flat(1);
            for (let index = 0; index < recentlyReservedRetE.length; index++) {
                flatArray[recentlyReservedRetE[index]].reserved = false;
            }
            recentlyReservedRetE = [];
            economySplicedRet = [];
            let temp1 = [];
            let temp2 = [];
            let temp3 = [];
            for (let i = 0; i < flatArray.length; i += 10) {
                temp1 = [];
                temp2 = [];
                temp3 = [];
                for (let j = i; j < i + 3; j++) {
                    temp1.push(flatArray[j]);
                    console.log("temp1: ", temp1);
                }
                for (let k = i + 3; k < i + 3 + 4; k++) {
                    temp2.push(flatArray[k]);
                    console.log("temp2: ", temp2);
                }
                for (let l = i + 7; l < i + 7 + 3; l++) {
                    temp3.push(flatArray[l]);
                    console.log("temp3: ", temp3);
                }
                economySplicedRet.push(temp1);
                economySplicedRet.push(temp2);
                economySplicedRet.push(temp3);
            }
            // setEconomyDepSeats(economySplicedDep)
            console.log(economyRetSeats);
        }
        setNumberOfSeats(seats);
    };
    const handleResetDepSeats = (e) => {
        e.preventDefault();
        if (cabin === "business") {
            for (let index = 0; index < recentlyReservedDepB.length; index++) {
                businessDepSeats[recentlyReservedDepB[index]].reserved = false;
                setBusinessDepSeats(businessDepSeats);
            }
            recentlyReservedDepB = [];
        } else {
            const flatArray = economySplicedDep.flat(1);
            for (let index = 0; index < recentlyReservedDepE.length; index++) {
                flatArray[recentlyReservedDepE[index]].reserved = false;
            }
            recentlyReservedDepE = [];
            economySplicedDep = [];
            let temp1 = [];
            let temp2 = [];
            let temp3 = [];
            for (let i = 0; i < flatArray.length; i += 10) {
                temp1 = [];
                temp2 = [];
                temp3 = [];
                for (let j = i; j < i + 3; j++) {
                    temp1.push(flatArray[j]);
                    console.log("temp1: ", temp1);
                }
                for (let k = i + 3; k < i + 3 + 4; k++) {
                    temp2.push(flatArray[k]);
                    console.log("temp2: ", temp2);
                }
                for (let l = i + 7; l < i + 7 + 3; l++) {
                    temp3.push(flatArray[l]);
                    console.log("temp3: ", temp3);
                }
                economySplicedDep.push(temp1);
                economySplicedDep.push(temp2);
                economySplicedDep.push(temp3);
            }
        }
        setNumberOfSeats(seats);
    };

    const handleRetSeatsChanged = (e) => {
        e.preventDefault()
        var tmp = retSeats;
        for (let i = 0; i < tmp.length; i++) {
            tmp[i] = tmp[i] + 1;
        }
        var data = {}

        data.username = loggedUser.username
        data.depSeats = reservationID.depSeatNumbers
        data.retSeats = tmp
        data.reservationId = reservationID._id
        data.retFlightMap = retFlightMap
        if (reservationID.cabin === 'business') {
            data.depFlightMap = departureFlight.businessMap
        }
        else {
            data.depFlightMap = departureFlight.economyMap
        }
        console.log(data)
        setOpenRetSeats(false);
        axios.post('/Users/updateReservation', data)
            .then(() => {
                setUpdate((prevState) => !prevState);
            }
            )
    };
    const handleOpenRetSeats = (
        e,
        reserve,
        depFlight,
        retFlight
    ) => {
        setReservationID(reserve)
        setDepartureFlight(depFlight)
        setReturnFlight(retFlight)
        setOpenRetSeats(true);
        let tempEconomy = retFlight.economyMap;
        let tempBusiness = retFlight.businessMap;
        setNumberOfSeats(reserve.seats);
        setSeats(reserve.seats);
        setCabin(reserve.cabin);
        if (reserve.cabin === "economy") {
            const reservedSeats = [];
            for (let i = 0; i < reserve.retSeatNumbers.length; i++) {
                const found = retFlight.economyMap.find((seat) => {
                    return seat.number === reserve.retSeatNumbers[i];
                });
                reservedSeats.push(found.number - 1);
            }
            recentlyReservedRetE = reservedSeats;
            for (let j = 0; j < recentlyReservedRetE.length; j++) {
                tempEconomy[recentlyReservedRetE[j]].reserved = false;
            }
            setEconomyRetSeats(tempEconomy);
            recentlyReservedRetE = [];
            economySplicedRet = [];
            for (let i = 0; i < economyRetSeats.length; i += 10) {
                let temp1 = [];
                let temp2 = [];
                let temp3 = [];
                for (let j = i; j < i + 3; j++) {
                    temp1.push(economyRetSeats[j]);
                }
                for (let k = i + 3; k < i + 3 + 4; k++) {
                    temp2.push(economyRetSeats[k]);
                }
                for (let l = i + 7; l < i + 7 + 3; l++) {
                    temp3.push(economyRetSeats[l]);
                }
                economySplicedRet.push(temp1);
                economySplicedRet.push(temp2);
                economySplicedRet.push(temp3);
            }
        } else {
            const reservedSeats = [];
            for (let i = 0; i < reserve.retSeatNumbers.length; i++) {
                const found = retFlight.businessMap.find((seat) => {
                    return seat.number === reserve.retSeatNumbers[i];
                });
                reservedSeats.push(found.number - 1);
            }
            recentlyReservedRetB = reservedSeats;
            for (let j = 0; j < recentlyReservedRetB.length; j++) {
                tempBusiness[recentlyReservedRetB[j]].reserved = false;
            }
            setBusinessRetSeats(tempBusiness);
            recentlyReservedRetB = [];
        }
    };
    return (
        <div style={{background:'linear-gradient(160deg, #004080,#004080 60%, white 60%, white)'}}>
            <div>
                <UserNavBar />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {loggedUser ? (
                    <>
                        <div>
                            <Paper
                                elevation={2}
                                square
                                variant="outlined"
                                style={{
                                    padding: "30px",
                                    marginTop: "30px",
                                    borderRadius: "1rem",
                                    width: "1000px",
                                }}
                            >
                                <Box>
                                    <Box sx={{ width: "100%" }}>
                                        <Collapse in={success}>
                                            <Alert
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setSuccess(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                                sx={{ mb: 2 }}
                                            >
                                                You have received an email confirming your cancellation
                                            </Alert>
                                        </Collapse>
                                    </Box>
                                    <Grid container spacing={1}>
                                        {/* User profile pic */}
                                        <Grid item sx={4}>
                                            <Paper
                                                elvation={3}
                                                square
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    borderRadius: "25px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <PersonIcon sx={{ fontSize: 100 }} />
                                            </Paper>
                                        </Grid>
                                        {/* Navigation */}
                                        <Grid item sx={5}>
                                            <Typography variant="h4" component="h4" style={{marginLeft: '20px'}}>
                                                {loggedUser.title} {loggedUser.firstName}{" "}
                                                {loggedUser.lastName}
                                            </Typography>
                                            <ButtonGroup
                                                color="secondary"
                                                aria-label="navigation"
                                                style={{ marginTop: "50px", marginLeft: "20px" }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<HomeIcon />}
                                                    color="secondary"
                                                    onClick={() => {
                                                        history.push("/");
                                                    }}
                                                >
                                                    Home
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<FlightTakeoffIcon />}
                                                    color="secondary"
                                                    onClick={() => {
                                                        history.push("/BookFlight");
                                                    }}
                                                >
                                                    Book Flight
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<PasswordIcon />}
                                                    color="secondary"
                                                    onClick={() => {
                                                        history.push("/ChangePassword");
                                                    }}
                                                >
                                                    Change Password
                                                </Button>
                                            </ButtonGroup>
                                        </Grid>
                                        <Grid item sm={3}></Grid>
                                    </Grid>
                                    <br />
                                    <Divider variant="middle"></Divider>
                                    <Grid container spacing={2}>
                                        <Grid item sm={3}></Grid>
                                        <Grid item sm={9}>
                                            <Box sx={{ width: "100%" }}>
                                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                                    <Tabs
                                                        value={value}
                                                        onChange={handleChange}
                                                        aria-label="basic tabs example"
                                                    >
                                                        <Tab
                                                            icon={<InfoIcon />}
                                                            iconPosition="start"
                                                            label="About"
                                                            {...a11yProps(0)}
                                                        />
                                                        <Tab
                                                            icon={<EventNoteIcon />}
                                                            iconPosition="start"
                                                            label="My Flights"
                                                            {...a11yProps(1)}
                                                        />
                                                    </Tabs>
                                                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                                                        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                                                            Your information has been edited Successfully
                                                        </Alert>
                                                    </Snackbar>
                                                </Box>
                                                {/* User personal info */}
                                                <TabPanel value={value} index={0}>
                                                    <Box>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    disabled
                                                                    value={loggedUser.username}
                                                                    label="Username"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={8}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    disabled
                                                                    value={loggedUser.dateOfBirth}
                                                                    label="Date of Birth"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <IconButton
                                                                    aria-label="male"
                                                                    style={{ marginRight: "20px" }}
                                                                    color={
                                                                        !maleDisabled ? "secondary" : "inherit"
                                                                    }
                                                                    disabled={maleDisabled}
                                                                >
                                                                    <MaleIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    aria-label="female"
                                                                    disabled={femaleDisabled}
                                                                    color={
                                                                        !femaleDisabled ? "secondary" : "inherit"
                                                                    }
                                                                >
                                                                    <FemaleIcon />
                                                                </IconButton>
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label={fNameVal.label}
                                                                    error={fNameVal.error}
                                                                    defaultValue={fName}
                                                                    onChange={fnameChange}
                                                                    type="text"
                                                                    required

                                                                />
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label={lNameVal.label}
                                                                    error={lNameVal.error}
                                                                    defaultValue={lName}
                                                                    onChange={lnameChange}
                                                                    type="text"
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item sm={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label={emailVal.label}
                                                                    error={emailVal.error}
                                                                    defaultValue={email}
                                                                    onChange={emailChange}
                                                                    type="email"
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item lg={4}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label={cc1Val.label}
                                                                    error={cc1Val.error}
                                                                    defaultValue={cc1}
                                                                    onChange={cc1Change}
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={8}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label={phone1Val.label}
                                                                    error={phone1Val.error}
                                                                    defaultValue={phone1}
                                                                    onChange={p1Change}
                                                                    type="tel"
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item lg={4}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label="Area Code 2"
                                                                    defaultValue={cc2}
                                                                    onChange={cc2Change}
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={8}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label="Phone 2"
                                                                    defaultValue={phone2}
                                                                    onChange={p2Change}
                                                                    type="tel"
                                                                />
                                                            </Grid>
                                                            <Grid item lg={4}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label="Area Code 3"
                                                                    defaultValue={cc3}
                                                                    onChange={cc3Change}
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={8}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label="Phone 3"
                                                                    defaultValue={phone3}
                                                                    onChange={p3Change}
                                                                    type="tel"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label={countryVal.label}
                                                                    error={countryVal.error}
                                                                    defaultValue={country}
                                                                    onChange={countryChange}
                                                                    type="text"
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label={cityVal.label}
                                                                    error={cityVal.error}
                                                                    defaultValue={city}
                                                                    onChange={cityChange}
                                                                    type="text"
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item sm={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    label={passportVal.label}
                                                                    error={passportVal.error}
                                                                    defaultValue={passport}
                                                                    onChange={passportChange}
                                                                    type="text"
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item sm={6}></Grid>
                                                            <Grid item sm={6}>
                                                                <Button
                                                                    variant="contained"
                                                                    onClick={UpdateUser}
                                                                    endIcon={<SaveIcon />}
                                                                    fullWidth
                                                                >
                                                                    {editing ? <CircularProgress color="inherit" /> : "Save Changes"}
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </TabPanel>
                                                {/* User's booked trips */}
                                                <TabPanel value={value} index={1}>
                                                    {isFetching ? (
                                                        <>
                                                            <CircularProgress />{" "}
                                                            <h4>Just a second, The planes are refueling</h4>
                                                        </>
                                                    ) : reservations.length === 0 ? (
                                                        <>
                                                            <Alert severity="warning">
                                                                You don't have any upcoming flights
                                                            </Alert>
                                                        </>
                                                    ) : (
                                                        reservations.map((reservation, index) => (
                                                            <>
                                                                <Paper
                                                                    elevation={0}
                                                                    variant="outlined"
                                                                    style={{
                                                                        padding: "30px",
                                                                        marginTop: "30px",
                                                                        borderRadius: "1rem",
                                                                        width: "650px",
                                                                        boxShadow: "0px 0px 0px 0px",
                                                                        border: "none",
                                                                    }}
                                                                >
                                                                    <Box>
                                                                        <Accordion
                                                                            style={{
                                                                                borderRadius: "8px",
                                                                                width: "900px",
                                                                                padding: "30px",
                                                                                marginLeft: "-250px",
                                                                            }}
                                                                        >
                                                                            <AccordionSummary
                                                                                expandIcon={<ExpandMoreIcon />}
                                                                                aria-controls="panel1a-content"
                                                                                id="panel1a-header"
                                                                            >
                                                                                <Grid container spacing={2}>
                                                                                    <Grid item sm={10}>
                                                                                        <Grid container spacing={2}>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography
                                                                                                    variant="h6"
                                                                                                    component="h6"
                                                                                                    style={{ marginLeft: "50px" }}
                                                                                                >
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .depCountry
                                                                                                    }
                                                                                                    ,{" "}
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .departureAirport
                                                                                                    }
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={2}>
                                                                                                <CompareArrowsIcon
                                                                                                    style={{ marginLeft: "50px" }}
                                                                                                />
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography
                                                                                                    variant="h6"
                                                                                                    component="h6"
                                                                                                    style={{ marginLeft: "50px" }}
                                                                                                >
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .depCountry
                                                                                                    }
                                                                                                    ,{" "}
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .departureAirport
                                                                                                    }
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography
                                                                                                    variant="h6"
                                                                                                    component="h6"
                                                                                                    style={{ marginLeft: "50px" }}
                                                                                                >
                                                                                                    {
                                                                                                        reservation.reservation
                                                                                                            .departureDate
                                                                                                    }{" "}
                                                                                                    {
                                                                                                        reservation.reservation
                                                                                                            .departureTime
                                                                                                    }
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={2}>
                                                                                                <AccessTimeIcon
                                                                                                    style={{ marginLeft: "50px" }}
                                                                                                />
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography
                                                                                                    variant="h6"
                                                                                                    component="h6"
                                                                                                    style={{ marginLeft: "50px" }}
                                                                                                >
                                                                                                    {
                                                                                                        reservation.reservation
                                                                                                            .returnDate
                                                                                                    }{" "}
                                                                                                    {
                                                                                                        reservation.reservation
                                                                                                            .returnTime
                                                                                                    }
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </AccordionSummary>
                                                                            <AccordionDetails>
                                                                                <Grid container spacing={2}>
                                                                                    <Grid item sm={6}>
                                                                                        <Timeline
                                                                                            style={{
                                                                                                marginLeft: "-200px",
                                                                                                marginTop: "-15px",
                                                                                            }}
                                                                                        >
                                                                                            <TimelineItem>
                                                                                                <TimelineOppositeContent>
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .flightNumber
                                                                                                    }
                                                                                                </TimelineOppositeContent>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot
                                                                                                        variant="outlined"
                                                                                                        color="secondary"
                                                                                                    />
                                                                                                    <TimelineConnector
                                                                                                        sx={{
                                                                                                            bgcolor: "secondary.main",
                                                                                                        }}
                                                                                                    />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent
                                                                                                    style={{ fontWeight: "bold" }}
                                                                                                    width="500px"
                                                                                                >
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .depCountry
                                                                                                    }
                                                                                                    ,{" "}
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .departureAirport
                                                                                                    }{" "}
                                                                                                    <br />{" "}
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .departureDate
                                                                                                    }{" "}
                                                                                                    {"-"}{" "}
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .departureTime
                                                                                                    }
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                            <TimelineItem>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot
                                                                                                        variant="outlined"
                                                                                                        color="secondary"
                                                                                                    />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent
                                                                                                    style={{ fontWeight: "bold" }}
                                                                                                    width="500px"
                                                                                                >
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .destCountry
                                                                                                    }
                                                                                                    ,{" "}
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .destinationAirport
                                                                                                    }{" "}
                                                                                                    <br />{" "}
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .arrivalDate
                                                                                                    }{" "}
                                                                                                    {"-"}{" "}
                                                                                                    {
                                                                                                        reservation.departureFlight
                                                                                                            .arrivalTime
                                                                                                    }
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                        </Timeline>
                                                                                    </Grid>
                                                                                    <Grid item sm={6}>
                                                                                        <Timeline
                                                                                            style={{
                                                                                                marginLeft: "-200px",
                                                                                                marginTop: "-15px",
                                                                                            }}
                                                                                        >
                                                                                            <TimelineItem>
                                                                                                <TimelineOppositeContent>
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .flightNumber
                                                                                                    }
                                                                                                </TimelineOppositeContent>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot
                                                                                                        variant="outlined"
                                                                                                        color="secondary"
                                                                                                    />
                                                                                                    <TimelineConnector
                                                                                                        sx={{
                                                                                                            bgcolor: "secondary.main",
                                                                                                        }}
                                                                                                    />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent
                                                                                                    style={{ fontWeight: "bold" }}
                                                                                                    width="500px"
                                                                                                >
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .depCountry
                                                                                                    }
                                                                                                    ,{" "}
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .departureAirport
                                                                                                    }{" "}
                                                                                                    <br />{" "}
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .departureDate
                                                                                                    }{" "}
                                                                                                    {"-"}{" "}
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .departureTime
                                                                                                    }
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                            <TimelineItem>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot
                                                                                                        variant="outlined"
                                                                                                        color="secondary"
                                                                                                    />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent
                                                                                                    style={{ fontWeight: "bold" }}
                                                                                                    width="500px"
                                                                                                >
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .destCountry
                                                                                                    }
                                                                                                    ,{" "}
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .destinationAirport
                                                                                                    }{" "}
                                                                                                    <br />{" "}
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .arrivalDate
                                                                                                    }{" "}
                                                                                                    {"-"}{" "}
                                                                                                    {
                                                                                                        reservation.returnFlight
                                                                                                            .arrivalTime
                                                                                                    }
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                        </Timeline>
                                                                                    </Grid>
                                                                                    <Grid item={3}>
                                                                                        <Box
                                                                                            style={{
                                                                                                display: "flex",
                                                                                                flexDirection: "column",
                                                                                                marginLeft: "50px",
                                                                                            }}
                                                                                        >
                                                                                            <Box style={{ display: "flex" }}>
                                                                                                {reservation.reservation.depSeatNumbers.map(
                                                                                                    (seat) => (
                                                                                                        <>
                                                                                                            <IconButton color="secondary">
                                                                                                                <AirlineSeatReclineNormalIcon />
                                                                                                                {seat}
                                                                                                            </IconButton>
                                                                                                        </>
                                                                                                    )
                                                                                                )}
                                                                                                <Tooltip title="Edit Seats">
                                                                                                    <IconButton
                                                                                                        onClick={(e) =>
                                                                                                            handleOpenDepSeats(
                                                                                                                e,
                                                                                                                reservation.reservation,
                                                                                                                reservation.departureFlight,
                                                                                                                reservation.returnFlight
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        <EditIcon />
                                                                                                    </IconButton>
                                                                                                </Tooltip>
                                                                                            </Box>
                                                                                            <Alert
                                                                                                icon={<AttachMoneyIcon />}
                                                                                                severity="info"
                                                                                            >
                                                                                                Total Price: EGP{" "}
                                                                                                {reservation.reservation
                                                                                                    .departurePrice *
                                                                                                    reservation.reservation.seats}
                                                                                            </Alert>
                                                                                            <br />
                                                                                            <Button 
                                                                                            color="warning" 
                                                                                            variant="outlined"
                                                                                            onClick={(e)=>{handleEditDepFlight(e,reservation.reservation)}}
                                                                                            >
                                                                                                Change Flight
                                                                                            </Button>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item sm={3}>
                                                                                        <Box style={{ marginLeft: "50px" }}>
                                                                                            <Typography variant="h6">
                                                                                                {reservation.reservation.cabin.toUpperCase()}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item={3}>
                                                                                        <Box
                                                                                            style={{
                                                                                                display: "flex",
                                                                                                flexDirection: "column",
                                                                                                marginLeft: "50px",
                                                                                            }}
                                                                                        >
                                                                                            <Box style={{ display: "flex" }}>
                                                                                                {reservation.reservation.retSeatNumbers.map(
                                                                                                    (seat) => (
                                                                                                        <>
                                                                                                            <IconButton color="secondary">
                                                                                                                <AirlineSeatReclineNormalIcon />
                                                                                                                {seat}
                                                                                                            </IconButton>
                                                                                                        </>
                                                                                                    )
                                                                                                )}
                                                                                                <Tooltip title="Edit Seats">
                                                                                                    <IconButton
                                                                                                        onClick={(e) =>
                                                                                                            handleOpenRetSeats(
                                                                                                                e,
                                                                                                                reservation.reservation,
                                                                                                                reservation.departureFlight,
                                                                                                                reservation.returnFlight
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        <EditIcon />
                                                                                                    </IconButton>
                                                                                                </Tooltip>

                                                                                            </Box>
                                                                                            <Alert
                                                                                                icon={<AttachMoneyIcon />}
                                                                                                severity="info"
                                                                                            >
                                                                                                Total Price: EGP{" "}
                                                                                                {reservation.reservation
                                                                                                    .returnPrice *
                                                                                                    reservation.reservation.seats}
                                                                                            </Alert>
                                                                                            <br />
                                                                                            <Button color="warning" variant="outlined">Change Flight</Button>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item sm={9}></Grid>
                                                                                    <Grid item sm={3}>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            onClick={(e) => {
                                                                                                handleCancelDialog(e, reservation.reservation)
                                                                                            }
                                                                                            }
                                                                                            color="error"
                                                                                        >
                                                                                            Cancel Booking
                                                                                        </Button>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </AccordionDetails>
                                                                        </Accordion>
                                                                    </Box>
                                                                </Paper>
                                                            </>
                                                        ))
                                                    )}
                                                </TabPanel>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </div>
                        <>
                            {/* cancel dialog */}
                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Cancel Booking
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to cancel this
                                        booking?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleCloseDialog}
                                        color="warning"
                                        variant="outlined"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        onClick={(e) => {
                                            handlecancelBooking(e);
                                        }}
                                        autoFocus
                                        color="error"
                                        variant="contained"
                                    >
                                        Cancel Booking
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Backdrop
                                sx={{
                                    color: "#fff",
                                    zIndex: (theme) => theme.zIndex.drawer + 1,
                                }}
                                open={backdropOpen}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            {/* Ret Seats */}
                            <Dialog
                                open={openRetSeats}
                                onClose={() => setOpenRetSeats(false)}
                                maxWidth="xl"
                            >
                                <DialogTitle>
                                    Change Retarture Flight Seats
                                </DialogTitle>
                                <DialogContent>
                                    <>
                                        <Paper
                                            elevation={3}
                                            variant="outlined"
                                            style={{
                                                borderRadius: "1rem",
                                                marginTop: "50px",
                                                padding: "30px",
                                                width: "1000px",
                                            }}
                                        >
                                            <Box>
                                                <Grid container spacing={3}>
                                                    <Grid item sm={12}>
                                                        <Box
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h4"
                                                                color="secondary"
                                                            >
                                                                Pick Your Seats
                                                            </Typography>
                                                        </Box>
                                                        <br />
                                                        <Divider varaint="middle" />
                                                        <br />
                                                    </Grid>
                                                    <Grid item sm={10}></Grid>
                                                    <Grid item sm={2}>
                                                        <Tooltip title="Reset Seats">
                                                            <IconButton
                                                                color="error"
                                                                onClick={
                                                                    handleResetRetSeats
                                                                }
                                                                aria-label="reset"
                                                            >
                                                                <RestoreIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item sm={3}>
                                                        <Button
                                                            variant="contained"
                                                            endIcon={<ExitToAppIcon />}
                                                            fullWidth
                                                            color="error"
                                                        >
                                                            Exit
                                                        </Button>
                                                    </Grid>
                                                    <Grid item sm={6}>
                                                        <Box
                                                            style={{
                                                                display: "flex",
                                                                marginLeft: "600px",
                                                            }}
                                                        >
                                                            <IconButton
                                                                variant="contained"
                                                                fullWidth
                                                                color="primary"
                                                            >
                                                                <CoffeeIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                variant="contained"
                                                                fullWidth
                                                                color="primary"
                                                            >
                                                                <WcIcon />
                                                            </IconButton>
                                                        </Box>
                                                        <br />
                                                        <Divider varaint="middle" />
                                                        <br />
                                                    </Grid>

                                                    {cabin === "economy" ? (
                                                        <>
                                                            <Grid item sm={4}>
                                                                <Box
                                                                    style={{
                                                                        display: "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginLeft: "25px",
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        A
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        B
                                                                    </Typography>
                                                                    <Typography variant="h5">
                                                                        C
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <Box
                                                                    style={{
                                                                        display: "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginLeft: "25px",
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        D
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        E
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        F
                                                                    </Typography>
                                                                    <Typography variant="h5">
                                                                        G
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <Box
                                                                    style={{
                                                                        display: "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginLeft: "25px",
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        H
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        I
                                                                    </Typography>
                                                                    <Typography variant="h5">
                                                                        J
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Grid item sm={4}>
                                                                <Box
                                                                    style={{
                                                                        display: "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginLeft: "25px",
                                                                            marginRight:
                                                                                "320px",
                                                                        }}
                                                                    >
                                                                        A
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight:
                                                                                "320px",
                                                                        }}
                                                                    >
                                                                        B
                                                                    </Typography>
                                                                    <Typography variant="h5">
                                                                        C
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={8}></Grid>
                                                        </>
                                                    )}
                                                    {cabin === "business"
                                                        ? businessRetSeats.map(
                                                            (seat) => (
                                                                <>
                                                                    <Grid item sm={4}>
                                                                        <Button
                                                                            color="info"
                                                                            disabled={
                                                                                seat.reserved
                                                                            }
                                                                            onClick={(e) => {
                                                                                handleSelectedRetSeat(
                                                                                    e,
                                                                                    seat.number
                                                                                );
                                                                            }}
                                                                            variant="contained"
                                                                            key={seat.number}
                                                                        >
                                                                            {seat.number}
                                                                        </Button>
                                                                    </Grid>
                                                                </>
                                                            )
                                                        )
                                                        : economySplicedRet.map(
                                                            (seat) => (
                                                                <>
                                                                    <Grid item sm={4}>
                                                                        {seat.map(
                                                                            (eseat) => (
                                                                                <Button
                                                                                    color="info"
                                                                                    disabled={
                                                                                        eseat.reserved
                                                                                    }
                                                                                    onClick={(
                                                                                        e
                                                                                    ) => {
                                                                                        handleSelectedRetSeat(
                                                                                            e,
                                                                                            eseat.number
                                                                                        );
                                                                                    }}
                                                                                    variant="contained"
                                                                                    size="medium"
                                                                                    style={{
                                                                                        marginRight:
                                                                                            "5px",
                                                                                    }}
                                                                                >
                                                                                    {eseat.number}
                                                                                </Button>
                                                                            )
                                                                        )}
                                                                    </Grid>
                                                                </>
                                                            )
                                                        )}
                                                    <Grid item sm={3}>
                                                        <br />
                                                        <Box
                                                            style={{
                                                                marginLeft: "80px",
                                                            }}
                                                        >
                                                            <IconButton
                                                                variant="contained"
                                                                fullWidth
                                                                color="primary"
                                                            >
                                                                <WcIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={6}></Grid>
                                                    <Grid item sm={3}>
                                                        <br />
                                                        <Box>
                                                            <IconButton
                                                                variant="contained"
                                                                fullWidth
                                                                color="primary"
                                                            >
                                                                <WcIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={3}>
                                                        <Button
                                                            variant="contained"
                                                            endIcon={<ExitToAppIcon />}
                                                            fullWidth
                                                            color="error"
                                                        >
                                                            Exit
                                                        </Button>
                                                    </Grid>
                                                    <Grid item sm={9}></Grid>
                                                    <Grid item sm={9}></Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => setOpenRetSeats(false)}
                                        variant="outlined"
                                        color="warning"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleRetSeatsChanged}
                                        variant="outlined"
                                        color="success"
                                    >
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            {/* dep seats */}
                            <Dialog
                                open={openDepSeats}
                                onClose={() => setOpenDepSeats(false)}
                                maxWidth="lg"
                            >
                                <DialogTitle>
                                    Change Departure Flight Seats
                                </DialogTitle>
                                <DialogContent>
                                    <>
                                        <Paper
                                            elevation={3}
                                            variant="outlined"
                                            style={{
                                                borderRadius: "1rem",
                                                marginLeft: "150px",
                                                marginTop: "50px",
                                                padding: "30px",
                                                width: "1000px",
                                            }}
                                        >
                                            <Box>
                                                <Grid container spacing={3}>
                                                    <Grid item sm={12}>
                                                        <Box
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h4"
                                                                color="secondary"
                                                            >
                                                                Pick Your Seats
                                                            </Typography>
                                                        </Box>
                                                        <br />
                                                        <Divider varaint="middle" />
                                                        <br />
                                                    </Grid>
                                                    <Grid item sm={10}></Grid>
                                                    <Grid item sm={2}>
                                                        <Tooltip title="Reset Seats">
                                                            <IconButton
                                                                color="error"
                                                                onClick={
                                                                    handleResetDepSeats
                                                                }
                                                                aria-label="reset"
                                                            >
                                                                <RestoreIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item sm={3}>
                                                        <Button
                                                            variant="contained"
                                                            endIcon={<ExitToAppIcon />}
                                                            fullWidth
                                                            color="error"
                                                        >
                                                            Exit
                                                        </Button>
                                                    </Grid>
                                                    <Grid item sm={6}>
                                                        <Box
                                                            style={{
                                                                display: "flex",
                                                                marginLeft: "600px",
                                                            }}
                                                        >
                                                            <IconButton
                                                                variant="contained"
                                                                fullWidth
                                                                color="primary"
                                                            >
                                                                <CoffeeIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                variant="contained"
                                                                fullWidth
                                                                color="primary"
                                                            >
                                                                <WcIcon />
                                                            </IconButton>
                                                        </Box>
                                                        <br />
                                                        <Divider varaint="middle" />
                                                        <br />
                                                    </Grid>

                                                    {cabin === "economy" ? (
                                                        <>
                                                            <Grid item sm={4}>
                                                                <Box
                                                                    style={{
                                                                        display: "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginLeft: "25px",
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        A
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        B
                                                                    </Typography>
                                                                    <Typography variant="h5">
                                                                        C
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <Box
                                                                    style={{
                                                                        display: "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginLeft: "25px",
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        D
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        E
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        F
                                                                    </Typography>
                                                                    <Typography variant="h5">
                                                                        G
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <Box
                                                                    style={{
                                                                        display: "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginLeft: "25px",
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        H
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight: "50px",
                                                                        }}
                                                                    >
                                                                        I
                                                                    </Typography>
                                                                    <Typography variant="h5">
                                                                        J
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Grid item sm={4}>
                                                                <Box
                                                                    style={{
                                                                        display: "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginLeft: "25px",
                                                                            marginRight:
                                                                                "320px",
                                                                        }}
                                                                    >
                                                                        A
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        style={{
                                                                            marginRight:
                                                                                "320px",
                                                                        }}
                                                                    >
                                                                        B
                                                                    </Typography>
                                                                    <Typography variant="h5">
                                                                        C
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={8}></Grid>
                                                        </>
                                                    )}
                                                    {cabin === "business"
                                                        ? businessDepSeats.map(
                                                            (seat) => (
                                                                <>
                                                                    <Grid item sm={4}>
                                                                        <Button
                                                                            color="info"
                                                                            disabled={
                                                                                seat.reserved
                                                                            }
                                                                            onClick={(e) => {
                                                                                handleSelectedDepSeat(
                                                                                    e,
                                                                                    seat.number
                                                                                );
                                                                            }}
                                                                            variant="contained"
                                                                            key={seat.number}
                                                                        >
                                                                            {seat.number}
                                                                        </Button>
                                                                    </Grid>
                                                                </>
                                                            )
                                                        )
                                                        : economySplicedDep.map(
                                                            (seat) => (
                                                                <>
                                                                    <Grid item sm={4}>
                                                                        {seat.map(
                                                                            (eseat) => (
                                                                                <Button
                                                                                    color="info"
                                                                                    disabled={
                                                                                        eseat.reserved
                                                                                    }
                                                                                    onClick={(
                                                                                        e
                                                                                    ) => {
                                                                                        handleSelectedDepSeat(
                                                                                            e,
                                                                                            eseat.number
                                                                                        );
                                                                                    }}
                                                                                    variant="contained"
                                                                                    size="medium"
                                                                                    style={{
                                                                                        marginRight:
                                                                                            "5px",
                                                                                    }}
                                                                                >
                                                                                    {eseat.number}
                                                                                </Button>
                                                                            )
                                                                        )}
                                                                    </Grid>
                                                                </>
                                                            )
                                                        )}
                                                    <Grid item sm={3}>
                                                        <br />
                                                        <Box
                                                            style={{
                                                                marginLeft: "80px",
                                                            }}
                                                        >
                                                            <IconButton
                                                                variant="contained"
                                                                fullWidth
                                                                color="primary"
                                                            >
                                                                <WcIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={6}></Grid>
                                                    <Grid item sm={3}>
                                                        <br />
                                                        <Box>
                                                            <IconButton
                                                                variant="contained"
                                                                fullWidth
                                                                color="primary"
                                                            >
                                                                <WcIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={3}>
                                                        <Button
                                                            variant="contained"
                                                            endIcon={<ExitToAppIcon />}
                                                            fullWidth
                                                            color="error"
                                                        >
                                                            Exit
                                                        </Button>
                                                    </Grid>
                                                    <Grid item sm={9}></Grid>
                                                    <Grid item sm={9}></Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => setOpenDepSeats(false)}
                                        variant="outlined"
                                        color="warning"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDepSeatsChanged}
                                        variant="outlined"
                                        color="success"
                                    >
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    </>
                ) : (
                    <>
                        <h1>User isn't logged in</h1>
                    </>
                )}
            </div>
        </div>
    );
}