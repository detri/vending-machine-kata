export const Size = {
  XSMALL: 'sizeXSMALL',
  SMALL: 'sizeSMALL',
  MEDIUM: 'sizeMEDIUM',
  LARGE: 'sizeLARGE'
};

export const Weight = {
  LIGHT: 'weightLEIGHT',
  MEDIUM: 'weightMEDIUM',
  HEAVY: 'weightHEAVY'
};

export const Coin = {
  PENNY: {
    weight: Weight.LIGHT,
    size: Size.SMALL,
    value: .01
  },
  NICKEL: {
    weight: Weight.MEDIUM,
    size: Size.LARGE,
    value: .05
  },
  DIME: {
    weight: Weight.LIGHT,
    size: Size.XSMALL,
    value: .10
  },
  QUARTER: {
    weight: Weight.HEAVY,
    size: Size.LARGE,
    value: .25
  }
};