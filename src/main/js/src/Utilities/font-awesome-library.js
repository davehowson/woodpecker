import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faBars,
    faUserCircle,
    faHome,
    faTasks,
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
    faChevronLeft,
    faBookmark
} from '@fortawesome/free-solid-svg-icons';

const fontAwesomeLibrary = () => {
    library.add(
        faBars,
        faHome,
        faUserCircle,
        faTasks,
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
        faChevronLeft,
        faBookmark
    );
}

export { fontAwesomeLibrary };
