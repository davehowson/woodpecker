import { library } from '@fortawesome/fontawesome-svg-core';

import { 
    faBars, 
    faUserCircle,
    faHome,
    faTasks,
    faStickyNote,
    faUserCog,
    faCheck,
    faInbox,
    faClock,
    faCalendarWeek,
    faCheckDouble,
    faPlus,
    faCheckCircle,
    faExclamationCircle,
    faMinusCircle,
    faEdit,
    faChevronRight,
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

const fontAwesomeLibrary = () => {
    library.add(
        faBars,
        faHome,
        faUserCircle,
        faTasks,
        faStickyNote,
        faUserCog,
        faCheck,
        faInbox,
        faClock,
        faCalendarWeek,
        faCheckDouble,
        faPlus,
        faCheckCircle,
        faExclamationCircle,
        faMinusCircle,
        faEdit,
        faChevronRight,
        faChevronLeft
    );
}

export { fontAwesomeLibrary };