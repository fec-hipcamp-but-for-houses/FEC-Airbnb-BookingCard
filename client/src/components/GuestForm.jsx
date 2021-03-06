import React from 'react';
import GuestModal from './GuestModal.jsx';

const guestContainer = {
  marginBottom: '16px',
};

const font12 = {
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '1.33333em',
  margin: '0',
  paddingBottom: '4px',
};

const buttonContainer = {
  position: 'relative',
  width: '100%',
};

const guestButton = {
  textAlign: 'left',
  display: 'block',
  width: '100%',
  borderRadius: '2px',
  padding: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#ebebeb',
  cursor: 'pointer',
};

const expandedButton = {
  textAlign: 'left',
  lineHeight: 'normal',
  display: 'block',
  width: '100%',
  borderRadius: '2px',
  padding: '8px',
  borderWidth: '1px 1px 2px',
  borderStyle: 'solid',
  borderColor: '#ebebeb #ebebeb #008489',
  borderBottom: '2px solid #008489',
};

const buttonMargin = {
  marginLeft: '8px',
  marginRight: '8px',
};

const buttonDiv = {
  margin: '0px',
  fontSize: '16px',
  fontWeight: '300',
  lineHeight: '1.375em',
  color: '#484848',
};

const buttonTable = {
  display: 'table',
  width: '100%',
  borderSpacing: '0px',
};

const guestCell = {
  display: 'table-cell',
  width: '100%',
  verticalAlign: 'middle',
};

const guestLabel = {
  fontSize: '17px',
  margin: '0',
  padding: '0',
};

const expandedSpan = {
  cursor: 'pointer',
  padding: '0',
  margin: '0',
};

const activeSpan = {
  backgroundColor: '#99ede6',
  borderColor: '#99ede6',
  color: '#007a87',
  borderRadius: '3px',
  cursor: 'pointer',
  padding: '4.25px 8.5px',
  margin: '0',
};

const svgCell = {
  display: 'table-cell',
  verticalAlign: 'middle',
};

const svgStyle = {
  height: '16px',
  width: '16px',
  display: 'block',
  fill: 'currencolor',
};

class GuestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
      activeGuestCount: false,
      activeInfantCount: false,
      adultCount: 1,
      childCount: 0,
      infantCount: 0,
      guestCount: 1,
      adultCountAddDisable: false,
      childCountAddDisable: false,
      infantCountAddDisable: false,
      adultCountSubtractDisable: true,
      childCountSubtractDisable: true,
      infantCountSubtractDisable: true,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleMouseEnter = (e) => {
    e.target.style.textDecoration = 'underline';
  }

  handleMouseLeave = (e) => {
    e.target.style.textDecoration = 'none';
  }

  handleAddButton = (e) => {
    const name = e.target.getAttribute('name');
    const disableAdd = `${name}AddDisable`;
    const disableSubtract = `${name}SubtractDisable`;
    const { maxGuests, maxInfants } = this.props;

    if (!this.state[disableAdd]) {
      this.setState(prevState => ({ [name]: prevState[name] + 1 }),
        () => {
          if (name !== 'infantCount') {
            const { adultCount, childCount } = this.state;

            this.setState({ guestCount: adultCount + childCount, activeGuestCount: true, activeInfantCount: false },
              () => {
                const { guestCount } = this.state;

                if (guestCount === maxGuests) {
                  this.setState({ adultCountAddDisable: true, childCountAddDisable: true });
                }
              });
          } else {
            const { infantCount } = this.state;
            this.setState({ activeGuestCount: false, activeInfantCount: true });
            if (infantCount === maxInfants) this.setState({ [disableAdd]: true });
          }
          this.setState({ [disableSubtract]: false });
        });
    }
  }

  handleSubtractButton = (e) => {
    const name = e.target.getAttribute('name');
    const disableAdd = `${name}AddDisable`;
    const disableSubtract = `${name}SubtractDisable`;
    if (!this.state[disableSubtract]) {
      this.setState(prevState => ({ [name]: prevState[name] - 1 }),
        () => {
          this.setState({ [disableAdd]: false });
          const { adultCount, childCount, infantCount } = this.state;

          if (name !== 'infantCount') {
            this.setState({ 
              guestCount: adultCount + childCount,
              activeGuestCount: true,
              activeInfantCount: false,
            },
            () => {
              const { guestCount } = this.state;
              const { maxGuests } = this.props;

              if (guestCount < maxGuests) {
                this.setState({ adultCountAddDisable: false, childCountAddDisable: false });
              }
            });
          } else {
            this.setState({ activeInfantCount: true, activeGuestCount: false });
          }
          if (name === 'adultCount' && adultCount === 1) this.setState({ adultCountSubtractDisable: true });
          if (name === 'childCount' && childCount === 0) this.setState({ childCountSubtractDisable: true });
          if (name === 'infantCount' && infantCount === 0) this.setState({ infantCountSubtractDisable: true });
        });
    }
  }

  expandModal = () => this.setState({ expand: true, activeGuestCount: true });

  handleClick = (e) => {
    if (!this.node.contains(e.target)) this.closeModal();
  }

  closeModal = () => this.setState({ expand: false, activeInfantCount: false });


  render() {
    const {
      expand, adultCount, childCount, infantCount, guestCount,
      adultCountAddDisable, childCountAddDisable, infantCountAddDisable,
      adultCountSubtractDisable, childCountSubtractDisable, infantCountSubtractDisable,
      activeGuestCount, activeInfantCount,
    } = this.state;

    const { maxGuests } = this.props;

    return (
      <div>
        <div style={guestContainer}>
          <span style={font12}>Guests</span>
          <div style={buttonContainer}>
            <button id="guestButton" style={expand ? expandedButton : guestButton} type="button" onClick={this.expandModal}>
              <div style={buttonMargin}>
                <div style={buttonDiv}>
                  <div style={buttonTable}>
                    <div style={guestCell}>
                      <div style={guestLabel}>
                        <span style={expand ? (activeGuestCount ? activeSpan : expandedSpan) : {}}>{`${guestCount} guests`}</span>
                        {infantCount > 0 && <span>,</span>}
                        {infantCount > 0 && <span style={expand ? (activeInfantCount ? activeSpan : expandedSpan) : {}}>{`${infantCount} infants`}</span>}
                      </div>
                    </div>
                    <div style={svgCell}>
                      {!expand && <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={svgStyle}><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd" /></svg>}
                      {expand && <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={svgStyle}><path d="m1.71 13.71a1 1 0 1 1 -1.42-1.42l8-8a1 1 0 0 1 1.41 0l8 8a1 1 0 1 1 -1.41 1.42l-7.29-7.29z" fillRule="evenodd" /></svg>}
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div ref={(node) => { this.node = node; }}>
              {expand && <GuestModal maxGuests={maxGuests} adultAddDisable={adultCountAddDisable} adultSubtractDisable={adultCountSubtractDisable} childAddDisable={childCountAddDisable} childSubtractDisable={childCountSubtractDisable} infantAddDisable={infantCountAddDisable} infantSubtractDisable={infantCountSubtractDisable} expandModal={this.expandModal} closeModal={this.closeModal} adultCount={adultCount} childCount={childCount} infantCount={infantCount} handleAddButton={this.handleAddButton} handleSubtractButton={this.handleSubtractButton} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuestForm;
