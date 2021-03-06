import React from 'react';
import moment from 'moment';
const styled = window.styled;
import Calendar from './Calendar.jsx';

const checking = {
  marginTop: '16px',
  marginBottom: '8px',
};

const checkingDiv = {
  position: 'relative',
  display: 'block',
  fontWeight: '600',
  boxSizing: 'border-box',
};

const checkingForms = {
  display: 'table',
  tableLayout: 'fixed',
  width: '100%',
  border: '1px solid #ebebeb',
  borderRadius: '2px',
};

const checkingRow = {
  display: 'table-row',
};

const font12 = {
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '1.33333em',
  margin: '0',
  paddingBottom: '4px',
};

const checkingCell = {

};

const formDiv = {
  boxSizing: 'border-box',
  fontWeight: 'normal',
  fontSize: '17px',
  lineHeight: '24px',
  color: '#757575',
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  verticalAlign: 'middle',
  padding: '8px',
};

const checkForm = {
  fontSize: '16px',
  opacity: '0',
  position: 'absolute',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
  borderWidth: '0',
};

const arrowContainer = {
  display: 'table-cell',
  verticalAlign: 'middle',
  width: '24px',
};

const arrow = {
  height: '24px',
  width: '24px',
  display: 'block',
  fill: 'currentcolor',
};

const svgStyle = {
  position: 'absolute',
  width: '20px',
  height: '10px',
  left: '22px',
  zIndex: '2',
  top: '40px',
};

const pathOne = {
  fill: '#fff',
};

const pathTwo = {
  stroke: '#ebebeb',
  fill: '#0000',
};

const inactiveText = {
  whiteSpace: 'nowrap',
  padding: '0 6px',
  overflow: 'hidden',
  fontWeight: '300',
};

const activeText = {
  whiteSpace: 'nowrap',
  color: 'rgb(0, 122, 135)',
  padding: '0 6px',
  overflow: 'hidden',
  background: 'rgb(153, 237, 230)',
  borderColor: 'rgb(153, 237, 230)',
  borderRadius: '3px',
  fontWeight: '300',
};

const blankStyle = {
  display: 'table-cell',
  width: '39px',
  height: '39px',
};

const tdDayStyle = {
  display: 'table-cell',
  boxSizing: 'border-box',
  pointer: 'cursor',
  fontSize: '14px',
  textAlign: 'center',
  verticalAlign: 'inherit',
  width: '39px',
  height: '39px',
  border: '1px solid #e4e7e7',
  color: '#484848',
  background: '#fff',
};

const SelectedDay = styled.td`
  display: table-cell;
  box-sizing: border-box;
  width: 39px;
  height: 39px;
  color: #fff;
  border: 1px double rgb(0, 166, 153);
  background: rgb(0, 166, 153);
`;

const HoverDay = styled.td`
  display: table-cell;
  box-sizing: border-box;
  width: 39px;
  height: 39px;
  color: #fff;
  border: 1px double rgb(128, 232, 224);
  background: rgb(178, 241, 236);
`;

const Day = styled.td`
  display: table-cell;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  vertical-align: inherit;
  width: 39px;
  height: 39px;
  border: 1px solid #e4e7e7;
  color: #484848;
  background: #fff;

  &:hover {
    color: inherit;
    background: rgb(228, 231, 231);
  }
`;

const dayDiv = {
  height: '38px',
  width: '38px',
  position: 'relative',
  margin: '0',
};

const dayPadding = {
  paddingBottom: '13px',
  paddingTop: '13px',
  fontSize: '14px',
};

const dayText = {
  fontWeight: '700',
  height: '12px',
  lineHeight: '12px',
  textAlign: 'center',
  width: '38px',
  color: 'inherit',
};

const blackoutDiv = {
  height: '38px',
  width: '38px',
  position: 'relative',
  color: '#d8d8d8',
  margin: '0',
  textDecoration: 'line-through',
};

const blackoutPadding = {
  paddingBottom: '13px',
  paddingTop: '13px',
  fontSize: '14px',
};

const blackoutText = {
  fontWeight: '700',
  height: '12px',
  lineHeight: '12px',
  textAlign: 'center',
  width: '38px',
  color: '#d8d8d8',
};

class CheckingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkInActive: false,
      checkoutActive: false,
      currentDateObj: moment(),
      dateObj: moment(),
      bookStartDate: null,
      bookFinalDate: null,
      bookFinalAvail: null,
      bookDates: [],
      bookHoverDates: [],
      minNightBlackoutDates: [],
      hideShortcuts: true,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  onDayClick = (e) => {
    const {
      bookStartDate,
      bookFinalDate,
      checkInActive,
      checkoutActive
    } = this.state;
    const { minNights, bookings } = this.props;
    const { id } = e.currentTarget;

    if (checkInActive) {
      if (!bookStartDate && bookFinalDate) {
        let checkId = id;
        if (moment(checkId).isBefore(bookFinalDate)) {
          while (checkId !== bookFinalDate) {
            if (bookings.includes(checkId)) return;
            checkId = moment(checkId).add(1, 'days').format('YYYY-MM-DD');
          }
          this.updateBookStartDate(id);
        } else if (moment(id).isAfter(bookFinalDate)) {
          this.setState({ bookFinalDate: null }, () => {
            this.onClearButton();
            this.updateBookStartDate(id);
          });
        } else {
          this.updateBookStartDate(id);
        }
      } else if (bookStartDate && bookFinalDate) {
        this.setState({
          bookStartDate: null,
          bookFinalDate: null,
          bookFinalAvail: null,
          bookDates: [],
          minNightBlackoutDates: [],
          bookHoverDates: [],
        },
        () => {
          this.updateBookStartDate(id);
        });
      } else if (bookStartDate) {
        this.setState({ bookStartDate: null }, () => {
          this.onClearButton();
          this.updateBookStartDate(id);
        });
      } else {
        this.updateBookStartDate(id);
      }
    } else if (checkoutActive) {
      if (bookStartDate) {
        let checkId = id;
        for (let i = 1; i < minNights; i++) {
          if (checkId === bookStartDate) return;
          checkId = moment(checkId).subtract(1, 'days').format('YYYY-MM-DD');
        }
        if (moment(id).isBefore(bookStartDate)) {
          this.setState({ bookFinalDate: null }, () => {
            this.onClearButton();
            this.updateBookStartDate(id);
          });
        } else {
          this.updateBookFinalDate(id);
        }
      } else {
        this.updateBookFinalDate(id);
      }
    }
  }

  updateBookFinalDate = (id) => {
    const { getBookedDates } = this.props;
    this.setState({ bookFinalDate: id },
      () => {
        const { bookStartDate, bookFinalDate } = this.state;
        if (bookStartDate && bookFinalDate) {
          this.bookDates();
        } else {
          this.minNightBlackout(id, false);
          this.findFinalAvail(id, false);
          this.setState({ checkInActive: true, checkoutActive: false });
        }

        getBookedDates(bookStartDate, bookFinalDate);
      });
  }

  updateBookStartDate = (id) => {
    const { getBookedDates } = this.props;

    this.setState(({ bookStartDate: id }),
      () => {
        const { bookStartDate, bookFinalDate } = this.state;

        if (bookStartDate && bookFinalDate) {
          this.bookDates();
        } else {
          this.minNightBlackout(id, true);
          this.findFinalAvail(id, true);
          this.setState({ checkInActive: false, checkoutActive: true });
        }
        getBookedDates(bookStartDate, bookFinalDate);
      });
  }

  onHoverBook = (e) => {
    let { id } = e.currentTarget;
    const { minNights } = this.props;
    const { bookStartDate, bookFinalDate } = this.state;
    const bookHoverDates = [];

    if (bookStartDate && bookFinalDate) return;
    if (bookStartDate && moment(id, 'YYYY-MM-DD').isBefore(bookStartDate)) return;

    if (bookStartDate) {
      if (id === bookStartDate) {
        for (let i = 1; i < minNights; i++) {
          const hoverDay = moment(id, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD');
          bookHoverDates.push(hoverDay);
        }
      } else {
        while (id !== bookStartDate) {
          bookHoverDates.push(id);
          id = moment(id, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD');
        }
      }
    } else if (bookFinalDate) {
      if (id === bookFinalDate) {
        for (let i = 1; i < minNights; i++) {
          const hoverDay = moment(id, 'YYYY-MM-DD').subtract(i, 'days').format('YYYY-MM-DD');
          bookHoverDates.push(hoverDay);
        }
      } else if (moment(id).isAfter(bookFinalDate)) {
        return;
      } else {
        while (id !== bookFinalDate) {
          bookHoverDates.push(id);
          id = moment(id, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
        }
      }
    }
    this.setState({ bookHoverDates });
  }

  onHoverLeave = () => this.setState({ bookHoverDates: [] });

  onQuestionClick = () => this.setState({ hideShortcuts: false });

  onCloseShortcuts = () => this.setState({ hideShortcuts: true });

  minNightBlackout = (id, isCalOne) => {
    const { minNights } = this.props;
    const minNightBlackoutDates = minNights === 1 ? [] : [id];

    for (let i = 1; i < minNights - 1; i++) {
      const blackoutDay = isCalOne ? moment(id, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD') : moment(id, 'YYYY-MM-DD').subtract(i, 'days').format('YYYY-MM-DD');
      minNightBlackoutDates.push(blackoutDay);
    }
    this.setState({ minNightBlackoutDates });
  };

  findFinalAvail = (id, isCalOne) => {
    let bookFinalAvail = id;
    const { currentDateObj } = this.state;
    const currentDate = currentDateObj.format('YYYY-MM-DD');
    const { bookings, finalDate } = this.props;

    while (
      !bookings.includes(bookFinalAvail)
      && (isCalOne ? bookFinalAvail !== finalDate : bookFinalAvail !== currentDate)) {
      bookFinalAvail = isCalOne ? moment(bookFinalAvail, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD') : moment(bookFinalAvail, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD');
    }
    this.setState({ bookFinalAvail });
  }

  bookDates = () => {
    const { bookStartDate, bookFinalDate } = this.state;
    let id = bookStartDate;
    const bookDates = [];

    while (id <= bookFinalDate) {
      bookDates.push(id);
      id = moment(id, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
    }

    this.setState({ bookDates, bookFinalAvail: null }, () => {
      this.closeModal();
    });
  }

  onClearButton = () => {
    this.setState({
      bookStartDate: null,
      bookFinalDate: null,
      bookFinalAvail: null,
      bookDates: [],
      minNightBlackoutDates: [],
      bookHoverDates: [],
    },
    () => {
      const { getBookedDates } = this.props;
      getBookedDates(null, null);
    });
  }

  setMonth = (next) => {
    const { dateObj } = this.state;
    const currentMonth = dateObj.month();
    let newDateObj = Object.assign({}, dateObj);

    if (next) newDateObj = moment(newDateObj).set('month', currentMonth + 1);
    else newDateObj = moment(newDateObj).set('month', currentMonth - 1);

    this.setState({ dateObj: newDateObj });
  }

  getFirstDayOfMonth = () => {
    const { dateObj } = this.state;
    return moment(dateObj).startOf('month').format('d');
  }

  createBlanks = () => {
    const blanks = [];
    for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
      blanks.push(
        <td key={i} style={blankStyle} />
      );
    }
    return blanks;
  }

  createDays = (calId) => {
    const days = [];
    const {
      dateObj,
      currentDateObj,
      bookStartDate,
      bookFinalDate,
      minNightBlackoutDates,
      bookHoverDates,
      bookFinalAvail,
      bookDates,
    } = this.state;
    const { bookings, finalDate, minNights } = this.props;
    const setMonth = dateObj.format('MM');
    const setMonthInt = parseInt(setMonth);
    const setYear = dateObj.format('YYYY');
    const setYearInt = parseInt(setYear);
    const yearId = dateObj.format('YYYY');
    const monthId = dateObj.format('MM');
    let finalYear;
    let finalMonth;
    let finalDay;
    let finalPadding;
    let finalSplit;
    let initYear;
    let initMonth;
    let initDay;
    let initPadding;

    if ((bookStartDate && calId === 'checkout')) {
      initMonth = parseInt(moment(bookStartDate).format('MM'));
      initYear = parseInt(moment(bookStartDate).format('YYYY'));
      initDay = parseInt(moment(bookStartDate).format('DD'));
    } else if (calId === 'checkout' && !bookStartDate && !bookFinalDate) {
      initPadding = moment(currentDateObj).add(minNights - 1, 'days');
      initMonth = parseInt(initPadding.format('MM'));
      initYear = parseInt(initPadding.format('YYYY'));
      initDay = parseInt(initPadding.format('DD'));
    } else {
      initMonth = parseInt(currentDateObj.format('MM'));
      initYear = parseInt(currentDateObj.format('YYYY'));
      initDay = parseInt(currentDateObj.format('DD'));
    }

    if (bookFinalDate && bookStartDate && calId === 'checkout') {
      finalSplit = bookFinalDate.split('-');
    } else if (calId === 'checkIn' && !bookStartDate && !bookFinalDate) {
      finalPadding = moment(finalDate, 'YYYY-MM-DD').subtract(minNights - 1, 'days').format('YYYY-MM-DD');
      finalSplit = finalPadding.split('-');
    } else if (calId === 'checkIn' && bookStartDate && !bookFinalDate) {
      finalSplit = finalDate.split('-');
    } else if (bookFinalDate && !bookStartDate) {
      finalSplit = finalDate.split('-');
      if (bookFinalAvail) {
        const availSplit = bookFinalAvail.split('-');
        [initYear, initMonth, initDay] = availSplit;
        initYear = parseInt(initYear);
        initMonth = parseInt(initMonth);
        initDay = parseInt(initDay);
      }
    } else if (finalDate || bookFinalAvail) {
      const useThisDate = bookFinalAvail || finalDate;
      finalSplit = useThisDate.split('-');
    }

    [finalYear, finalMonth, finalDay] = finalSplit;
    finalYear = parseInt(finalYear);
    finalMonth = parseInt(finalMonth);
    finalDay = parseInt(finalDay);

    for (let day = 1; day <= dateObj.daysInMonth(); day++) {
      const dayId = day < 10 ? `${yearId}-${monthId}-0${day}` : `${yearId}-${monthId}-${day}`;
      let blackout = true;
      if (bookings) {
        blackout = bookings.includes(dayId);
      }
      for (let i = 1; i < minNights; i++) {
        const checkDay = calId === 'checkIn' ? moment(dayId, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD') : moment(dayId, 'YYYY-MM-DD').subtract(i, 'days').format('YYYY-MM-DD');

        if (bookings.includes(checkDay)) blackout = true;
      }
      if (minNightBlackoutDates.includes(dayId)) blackout = true;
      if (dayId === bookStartDate || bookDates.includes(dayId) || dayId === bookFinalDate) {
        days.push(
          <SelectedDay id={dayId} key={dayId} onClick={blackout ? ()=>{} : this.onDayClick} onMouseOver={this.onHoverBook} onMouseLeave={this.onHoverLeave}>
            <div style={dayDiv}>
              <div style={dayPadding}>
                <div style={dayText}>{day}</div>
              </div>
            </div>
          </SelectedDay>
        );
      } else if (bookHoverDates.includes(dayId)) {
        days.push(
          <HoverDay id={dayId} key={dayId} onClick={this.onDayClick} onMouseOver={(bookStartDate || bookFinalDate) ? this.onHoverBook : ()=>{}} onMouseLeave={(bookStartDate || bookFinalDate) ? this.onHoverLeave : ()=>{}}>
            <div style={dayDiv}>
              <div style={dayPadding}>
                <div style={dayText}>{day}</div>
              </div>
            </div>
          </HoverDay>
        );
      } else if (
        blackout
        || setYearInt < initYear
        || (setYearInt === initYear && setMonthInt < initMonth)
        || (setYearInt === initYear && setMonthInt === initMonth && day < initDay)
        || setYearInt > finalYear
        || (setYearInt === finalYear && setMonthInt > finalMonth)
        || (setYearInt === finalYear && setMonthInt === finalMonth && day > finalDay)
      ) {
        days.push(
          <td id={dayId} key={dayId} style={tdDayStyle}>
            <div style={blackoutDiv}>
              <div style={blackoutPadding}>
                <div style={blackoutText}>{day}</div>
              </div>
            </div>
          </td>
        );
      } else {
        days.push(
          <Day id={dayId} key={dayId} onClick={this.onDayClick} onMouseOver={(bookStartDate || bookFinalDate) ? this.onHoverBook : ()=>{}} onMouseLeave={(bookStartDate || bookFinalDate) ? this.onHoverLeave : ()=>{}}>
            <div style={dayDiv}>
              <div style={dayPadding}>
                <div style={dayText}>{day}</div>
              </div>
            </div>
          </Day>
        );
      }
    }
    return days;
  }

  createTable = (calId) => {
    const days = this.createDays(calId);
    const blanks = this.createBlanks();

    const totalSlots = [...blanks, ...days];
    const table = [];
    let tableRow = [];

    totalSlots.forEach((slot, i) => {
      if (i % 7 !== 0) tableRow.push(slot);
      else {
        table.push(tableRow);
        tableRow = [];
        tableRow.push(slot);
      }
      if (i === totalSlots.length - 1) table.push(tableRow);
    });

    const month = table.map((row, i) => <tr key={i}>{row}</tr>);

    return month;
  }

  handleClick = (e) => {
    if (
      !this.svgOne.contains(e.target)
        && !this.svgTwo.contains(e.target)
        && !this.calOne.contains(e.target)
        && !this.calTwo.contains(e.target)
    ) this.closeModal();
  }

  handleKeyPress = (e) => {

  }

  closeModal = () => this.setState({ checkInActive: false, checkoutActive: false });

  openCheckInCalendar = (e) => {
    this.setState({ checkInActive: true, checkoutActive: false });
  }

  openCheckoutCalendar = (e) => {
    this.setState({ checkoutActive: true, checkInActive: false });
  }

  render() {
    const { checkInActive, checkoutActive, dateObj, bookStartDate, bookFinalDate, hideShortcuts } = this.state;
    const { checkIn, checkout, onInputCheckInChange, onInputCheckoutChange, bookings, finalDate, minNights, maxNights, getBookedDates } = this.props;

    return (
      <div style={checking}>
        <span style={font12}>Dates</span>
        <div style={checkingDiv}>
          <div style={checkingForms}>
            <div style={checkingRow}>
              <div id="checkInCalDiv" style={checkingCell} onClick={e => this.openCheckInCalendar(e)}>
                <div style={formDiv}>
                  <input style={checkForm} type="text" id="checkin" name="checkin" value={checkIn} onChange={(e) => onInputCheckInChange(e)} />
                  <div ref={(node) => { this.svgOne = node; }}>
                    {
                    checkInActive && (
                    <svg role="presentation" focusable="false" style={svgStyle}>
                      <path style={pathOne} d="M0,10 20,10 10,0z" />
                      <path style={pathTwo} d="M0,10 10,0 20,10" />
                    </svg>
                    )}
                  </div>
                  <div style={checkInActive ? activeText : inactiveText}>{checkIn}</div>
                </div>
              </div>
              <div ref={(node) => { this.calOne = node; }}>
                {
                checkInActive && (
                <Calendar calId="checkIn" onKeyPress={this.handleKeyPress} onCloseShortcuts={this.onCloseShortcuts} onQuestionClick={this.onQuestionClick} hideShortcuts={hideShortcuts} bookStartDate={bookStartDate} bookFinalDate={bookFinalDate} dateObj={dateObj} setMonth={this.setMonth} onClearButton={this.onClearButton} createTable={this.createTable} bookings={bookings} finalDate={finalDate} minNights={minNights} maxNights={maxNights} getBookedDates={getBookedDates} />
                )}
              </div>
              <div style={arrowContainer}>
                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={arrow}><path d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z" fillRule="evenodd" /></svg>
              </div>
              <div id="checkoutCalDiv" style={checkingCell} onClick={e => this.openCheckoutCalendar(e)}>
                <div style={formDiv}>
                  <input style={checkForm} type="text" id="checkout" name="checkout" value={checkout} onChange={e => onInputCheckoutChange(e)} />
                  <div ref={(node) => { this.svgTwo = node; }}>
                    {
                    checkoutActive && (
                    <svg role="presentation" focusable="false" style={svgStyle}>
                      <path style={pathOne} d="M0,10 20,10 10,0z" />
                      <path style={pathTwo} d="M0,10 10,0 20,10" />
                    </svg>
                    )}
                  </div>
                  <div style={checkoutActive ? activeText : inactiveText}>{checkout}</div>
                </div>
              </div>
              <div ref={(node) => { this.calTwo = node; }}>
                {
                checkoutActive && (
                <Calendar calId="checkout" onKeyPress={this.handleKeyPress} onCloseShortcuts={this.onCloseShortcuts} onQuestionClick={this.onQuestionClick} hideShortcuts={hideShortcuts} bookStartDate={bookStartDate} bookFinalDate={bookFinalDate} dateObj={dateObj} setMonth={this.setMonth} onClearButton={this.onClearButton} createTable={this.createTable} bookings={bookings} finalDate={finalDate} minNights={minNights} maxNights={maxNights} getBookedDates={getBookedDates} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckingForm;
