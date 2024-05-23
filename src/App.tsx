import { useEffect, useState } from 'react'
import polyuLogo from './assets/polyu_logo.png'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import { Grid, TextField, MenuItem, IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(160, 36, 55)', // PolyU red
    }
  },
});

const grades = [
  {
    value: 4.3,
    label: 'A+',
  },
  {
    value: 4.0,
    label: 'A',
  },
  {
    value: 3.7,
    label: 'A-',
  },
  {
    value: 3.3,
    label: 'B+',
  },
  {
    value: 3.0,
    label: 'B',
  },
  {
    value: 2.7,
    label: 'B-',
  },
  {
    value: 2.3,
    label: 'C+',
  },
  {
    value: 2.0,
    label: 'C',
  },
  {
    value: 1.7,
    label: 'C-',
  },
  {
    value: 1.3,
    label: 'D+',
  },
  {
    value: 1.0,
    label: 'D',
  },
  {
    value: 0.0,
    label: 'F',
  },
]

const FullWidthIconButton = styled(IconButton)({
  borderRadius: '5px',
});

const CenteredGrid = styled(Grid)({
  placeContent: 'center',
})

function App() {
  const [data, setData] = useState([{
    credit: {
      value: 0,
      label: '',
    },
    grade: {
      value: NaN,
      label: '',
    },
  }]);
  const [gpa, setGpa] = useState('');

  useEffect(() => {
    const accumData = data.reduce((a, c) => {
      return {
        credit: {
          value: a.credit.value + c.credit.value,
          label: '',
        },
        grade: {
          value: a.grade.value + c.grade.value * c.credit.value,
          label: '',
        },
      };
    }, {
      credit: {
        value: 0,
        label: '',
      },
      grade: {
        value: 0,
        label: '',
      },
    });
    setGpa((accumData.grade.value / accumData.credit.value).toFixed(2));
  }, [data, gpa]);

  return (
    <>
      <div className="mainContainer">
        <img src={polyuLogo} className="logo" alt="PolyU logo" draggable="false" />
        <h1>PolyU GPA Calculator</h1>
        <hr />
        <ThemeProvider theme={darkTheme}>
          <div className="dataContainer">
            {Array.from(data).map((item, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm>
                  <TextField
                    fullWidth
                    label="Credit"
                    variant="outlined"
                    value={item.credit.label}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setData(data.map((e, i) => {
                        if (i === index) {
                          if (event.target.value !== '' && isNaN(parseFloat(event.target.value))) {
                            return e;
                          }
                          return {
                            ...e,
                            credit: {
                              value: event.target.value === '' ? 0 : parseFloat(event.target.value),
                              label: event.target.value,
                            },
                          };
                        } else {
                          return e;
                        }
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm>
                  <TextField
                    fullWidth
                    select
                    label="Grade"
                    variant="outlined"
                    defaultValue={item.grade.label}
                    value={item.grade.label}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setData(data.map((e, i) => {
                        if (i === index) {
                          if (event.target.value !== '' && isNaN(parseFloat(event.target.value))) {
                            return e;
                          }
                          return {
                            ...e,
                            grade: {
                              value: event.target.value === '' ? NaN : parseFloat(event.target.value),
                              label: event.target.value,
                            },
                          };
                        } else {
                          return e;
                        }
                      }));
                    }}
                  >
                    {grades.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {
                  data.length > 1 &&
                  <CenteredGrid item xs={12} sm={1.5}>
                    <IconButton
                      aria-label="remove"
                      color="primary"
                      onClick={() => {
                        setData(data.filter((_, i) => i !== index))
                      }}
                    >
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                  </CenteredGrid>
                }
              </Grid>
            ))}
            <FullWidthIconButton
              aria-label="add"
              color="primary"
              onClick={() => {
                setData([
                  ...data,
                  {
                    credit: {
                      value: 0,
                      label: '',
                    },
                    grade: {
                      value: NaN,
                      label: '',
                    },
                  }
                ])
              }}
            >
              <AddBoxIcon />
            </FullWidthIconButton>
          </div>
        </ThemeProvider>
        <hr />
        <h3>GPA: {gpa === 'NaN' ? '-' : gpa}</h3>
      </div>
    </>
  )
}

export default App
