import React from 'react';

const optionsContainer = {
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute',
  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px',
  width: '100%',
  minWidth: '265px',
  textAlign: 'left',
  marginBottom: '16px',
  zIndex: '2',
  left: '0px',
  borderRadius: '3px',
  padding: '0px 16px',
  background: '#fff',
};

const optionsMargin = {
  marginTop: '16px',
  marginBottom: '16px',
};

const optionSection = {
  marginTop: '16px',
  marginBottom: '16px',
};

const optionSectionTwo = {
  marginTop: '24px',
  marginBottom: '24px',
};

const optionDiv = {
  paddingTop: '0px',
  paddingBottom: '0px',
  borderBottom: '0px',
};

const optionTable = {
  display: 'table',
  width: '100%',
  borderSpacing: '0px',
};

const cellText = {
  display: 'table-cell',
  width: '100%',
  verticalAlign: 'middle',
  marginRight: '12px',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.375em',
  color: '#484848',
};

const captionText = {
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.2857em',
  letterSpacing: 'normal',
  color: '#484848',
  paddingTop: '4px',
  display: 'block',
};

const optionButtonContainer = {
  display: 'table-cell',
  verticalAlign: 'middle',
};

const optionButtonTable = {
  display: 'table',
  width: '120px',
};

const minusCell = {
  display: 'table-cell',
  verticalAlign: 'middle',
  textAlign: 'left',
};

const countCell = {
  display: 'table-cell',
  verticalAlign: 'middle',
  textAlign: 'center',
};

const plusCell = {
  display: 'table-cell',
  verticalAlign: 'middle',
  textAlign: 'right',
};

const countText = {
  margin: '0',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.375em',
  color: '#484848',
};

const optionButton = {
  display: 'inline-block',
  cursor: 'pointer',
  textAlign: 'center',
  lineHeight: '1',
  position: 'relative',
  touchAction: 'manipulation',
  height: '32px',
  width: '32px',
  borderRadius: '50%',
  borderStyle: 'solid',
  borderColor: '#008489',
  background: '#0000',
  borderWidth: '1px',
};

const buttonSpan = {
  color: '#008489',
  display: 'inline-block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '16px',
};

const svgOptions = {
  height: '1em',
  width: '1em',
  display: 'block',
  fill: 'currentcolor',
};

const modalFoot = {
  marginBottom: '16px',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.2857em',
  color: '#484848',
};

const closeContainer = {
  textAlign: 'right',
  lineHeight: '0',
  alignItems: 'center',
};

const closeDiv = {
  display: 'inline-block',
  verticalAlign: 'middle',
  margin: '0',
};

const closeButton = {
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.375em',
  color: '#008489',
  background: '#0000',
  border: '0px',
  cursor: 'pointer',
  margin: '0px',
  padding: '0px',
  userSelect: 'auto',
  textAlign: 'left',
};

class GuestModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adults: 1, children: 0, infants: 0, guests: 1,
    };
  }

  handleMouseEnter = (e) => {
    e.target.style.textDecoration = 'underline';
  }

  handleMouseLeave = (e) => {
    e.target.style.textDecoration = 'none';
  }

  closeModal = () => {
    this.props.closeModal();
  }

  handleAddButton = (e) => {
    const name = e.target.getAttribute('name');
    console.log(e.target, this.state[name]);
    this.setState({ [name]: ++this.state[name] },
      () => {
        const { adults, children } = this.state;
        this.setState({ guests: adults + children });
      });
  }

  handleSubtractButton = (e) => {
    const name = e.target.getAttribute('name');
    this.setState({ [name]: --this.state[name] },
      () => {
        const { adults, children } = this.state;
        this.setState({ guests: adults + children });
      });
  }

  render() {
    const { adults, children, infants } = this.state;

    return (
      <div style={optionsContainer}>
        <div style={optionsMargin}>
          <div style={optionSection}>
            <div style={optionDiv}>
              <div style={optionTable}>
                <div style={cellText}>Adults</div>
                <div style={optionButtonContainer}>
                  <div style={optionButtonTable}>
                    <div style={minusCell}>
                      <button type="button" style={optionButton} name="adults" onClick={this.handleSubtractButton}>
                        <span style={buttonSpan}>
                          <svg viewBox="0 0 24 24" role="img" aria-label="subtract" name="adults" focusable="false" style={svgOptions}><rect name="adults" height="2" rx="1" width="12" x="6" y="11" /></svg>
                        </span>
                      </button>
                    </div>
                    <div style={countCell}>
                      <div style={countText}>{adults}</div>
                    </div>
                    <div style={plusCell}>
                      <button type="button" style={optionButton} name="adults" onClick={this.handleAddButton}>
                        <span style={buttonSpan}>
                          <svg viewBox="0 0 24 24" role="img" aria-label="add" name="adults" focusable="false" style={svgOptions}>
                            <rect name="adults" height="2" rx="1" width="12" x="6" y="11" />
                            <rect name="adults" height="12" rx="1" width="2" x="11" y="6" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={optionSectionTwo}>
            <div style={optionDiv}>
              <div style={optionTable}>
                <div style={cellText}>
                  <div>Children</div>
                  <div style={captionText}>Ages 2-12</div>
                </div>
                <div style={optionButtonContainer}>
                  <div style={optionButtonTable}>
                    <div style={minusCell}>
                      <button type="button" style={optionButton} name="children" onClick={this.handleSubtractButton}>
                        <span style={buttonSpan}>
                          <svg viewBox="0 0 24 24" role="img" aria-label="subtract" name="children" focusable="false" style={svgOptions}><rect name="children" height="2" rx="1" width="12" x="6" y="11" /></svg>
                        </span>
                      </button>
                    </div>
                    <div style={countCell}>
                      <div style={countText}>{children}</div>
                    </div>
                    <div style={plusCell}>
                      <button type="button" style={optionButton} name="children" onClick={this.handleAddButton}>
                        <span style={buttonSpan}>
                          <svg viewBox="0 0 24 24" role="img" aria-label="add" name="children" focusable="false" style={svgOptions}>
                            <rect name="children" height="2" rx="1" width="12" x="6" y="11" />
                            <rect name="children" height="12" rx="1" width="2" x="11" y="6" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={optionSectionTwo}>
            <div style={optionDiv}>
              <div style={optionTable}>
                <div style={cellText}>
                  <div>Infants</div>
                  <div style={captionText}>Under 2</div>
                </div>
                <div style={optionButtonContainer}>
                  <div style={optionButtonTable}>
                    <div style={minusCell}>
                      <button type="button" style={optionButton} name="infants" onClick={this.handleSubtractButton}>
                        <span style={buttonSpan}>
                          <svg viewBox="0 0 24 24" role="img" aria-label="subtract" name="infants" focusable="false" style={svgOptions}><rect name="infants" height="2" rx="1" width="12" x="6" y="11" /></svg>
                        </span>
                      </button>
                    </div>
                    <div style={countCell}>
                      <div style={countText}>{infants}</div>
                    </div>
                    <div style={plusCell}>
                      <button type="button" style={optionButton} name="infants" onClick={this.handleAddButton}>
                        <span style={buttonSpan}>
                          <svg viewBox="0 0 24 24" role="img" aria-label="add" name="infants" focusable="false" style={svgOptions}>
                            <rect name="infants" height="2" rx="1" width="12" x="6" y="11" />
                            <rect name="infants" height="12" rx="1" width="2" x="11" y="6" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={modalFoot}>
              4 guests maximum. Infants don&#39;t count toward the number of guests.
            </div>
          </div>
          <div style={closeContainer}>
            <div style={closeDiv}>
              <button type="button" style={closeButton} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuestModal;