import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import {Plus, Trash} from "iconoir-react";
import {colors} from "styles/colors";
import { getAdvisorRequestTypes, constantsSelector } from "redux/features/constants/constantsSlice";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
    DatePickerField,
    TimePickerField,
    TextField,
    Button
} from "@core/components";


const TaskExplornation = ({formik, checked, index, setChecked, task, handleAddTask, handleRemoveTask, classes}) => {
    return (
        <>
        {
            formik.values.tasks[index].explanation.map((explanation, key) => {
                return (
                    <Grid item key={key}>
                        <TextField
                            width='100%'
                            multiline
                            formik={formik}
                            name={`tasks[${index}].explanation[${key}]`}
                            value={explanation || ''}
                            placeholder="Add description"
                            onChange={(e) => {
                                const newChecked = [...checked]
                                newChecked[index].explanation[key] = e.target.value
                                setChecked(newChecked)
                                formik.handleChange(e);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <>
                                    {
                                        key == 0 ? (
                                            <Plus width="25px" onClick={() => handleAddTask(task)} className={classes.expandedInput} color={colors.brand}/>
                                        ) : (
                                            <Trash width="25px" onClick={() => handleRemoveTask(task, key)} className={classes.expandedInput} color={colors.brand}/>
                                        )
                                    }
                                    </>
                                    
                                )
                            }}
                        />
                    </Grid>
                )
            })
        }
        </>
    )
}


const RequestContent = ({stepChange, stepIndexChange, formik}) => {
    const dispatch = useDispatch();
    const { advisorRequestTypes } = useSelector(constantsSelector);
    const { hiredSuccess, isHiring } = useSelector(itinerariesSelector);

    const [checked, setChecked] = React.useState([]);
    const [checkedError, setCheckedError] = React.useState(false);
    const [fileNames, setFileNames] = useState([]);
    const [uploadedPDF, setUploadedPDF] = useState(false);


    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    useEffect(() => {
        setCheckedError(false);
        dispatch(getAdvisorRequestTypes())
    }, [dispatch])


    useEffect(() => {
        if (checked.length > 0) {
            setCheckedError(false);
        } 
    }, [checked])

    const inputRef = useRef()

    function handleChange(event) {
        if (event.target.files) {
            var files = event.target.files;
            if (files.length > 0) {
                formik.setFieldValue('attachments', files);
                setUploadedPDF(true);
                var fileNames = [];
                for (let i = 0; i < files.length; i++) {
                    fileNames.push(files[i].name);
                }
                setFileNames(fileNames)
            }
        }
    }

    const handleAddTask = (task) => {
        let newChecked = [...checked]
        const taskIndex = checked.findIndex((checkedItem) => checkedItem.advisorRequestTypeId == task.id)
        newChecked[taskIndex].explanation.push('')
        setChecked(newChecked);
        formik.setFieldValue('tasks', newChecked)
    }

    const handleRemoveTask = (task, index) => {
        let newChecked = [...checked]
        const taskIndex = checked.findIndex((checkedItem) => checkedItem.advisorRequestTypeId == task.id)
        newChecked[taskIndex].explanation.splice(index, 1)
        setChecked(newChecked);
        formik.setFieldValue('tasks', newChecked)
    }

    function changeFile() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleSelect = (task) => {
        let newChecked = [...checked]
        if (checked.findIndex((checkedItem) => checkedItem.advisorRequestTypeId == task.id) >= 0) {
            newChecked = [...checked.filter(checkedItem => checkedItem.advisorRequestTypeId != task.id)]
            setChecked(newChecked)
        } else {
            newChecked = [...checked, {advisorRequestTypeId: task.id, explanation: ['']}]
            setChecked(newChecked);
        }
        formik.setFieldValue('tasks', newChecked)
    };

    const handleClick = () => {
        if (checked.length > 0) {
            formik.submitForm()
        } else {
            setCheckedError(true);
        }
    }

    useEffect(() => {
        if (!isHiring && hiredSuccess) {
            stepChange('summary');
            stepIndexChange(2);
        }
    }, [hiredSuccess]);

    const useStyles = makeStyles({
        requestBtn: {
            fontSize: 12,
            marginTop: 12
        },
        nextBtn: {
            fontSize: 16
        },
        requestTitleContent: {
            marginTop: 28,
            color: '#242424',
            fontSize: 14,
            fontWeight: '600'
        },
        deadlineDescription: {
            color: '#000',
            fontSize: 14,
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'normal',
            marginTop: 8
        },
        documentContainer: {
            display: 'flex',
            flexDirection: 'column',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#E8E8E8',
            padding: '10px',
            marginTop: '10px',
            borderRadius: '5px'
        },
        pdfIconDiv: {
            backgroundColor: '#E3555F',
            borderRadius: '5px',
            width: '49px',
            height: '29px',
            fontSize: '12px',
            color: '#FFF',
            paddingTop: '5px',
            textAlign: 'center',
            marginRight: '10px'
        },
        documentDetailInfo: {
            color: '#000 !important',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 12,
            alignItems: 'center',
            paddingLeft: '10px',
            paddingTop: '5px'
        },  
        validationErrorNotification: {
            fontStyle: 'italic',
            color: 'red',
            marginTop: '5px !important',
            marginBottom: '5px !important',
            fontSize: '12px'
        },
        contentDiv: {
            minHeight: 600
        },
        selectField: {
            width:'100%',
            background: '#FFFFFF',
            border: '1px solid #E8E8E8',
            letterSpacing: '0.08em',
            padding: '7px 18px',
            textTransform: 'uppercase',
            fontFamily: 'Raleway',
            fontWeight: '600',
            fontSize: '12px',
            lineHeight: '30px',
            color:' #242424',
            appearance:'none',
            outline: 'none',
            marginTop:'12px !important',
            '&:before':{
                outline:'none',
                content: '" "',
                borderBottom: '0px',
                background: '#BA886E',
                borderRadius: '0px',
                position:'absolute',
                left:'auto',
                right:'0',               
                height: '100%',
                width: '54px',
            },
        },
        tasksContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '20px'
        },
        requestCheckBoxWrapper: {
            marginTop: '15px',
            marginBottom: '15px'
        },
        timePickerTest: {
            top: "700px !important"
        }
    });

    const classes = useStyles();

    

    return (
        <>  
            <Grid container className={classes.contentDiv}>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Name for Request</Typography>
                    <Grid item>
                        <TextField
                            width='100%'
                            formik={formik}
                            name="requestTitle"
                            placeholder="Enter name for request"
                        />
                        {formik.touched.requestTitle && formik.errors.requestTitle && <div className={classes.validationErrorNotification}>{formik.errors.requestTitle}</div>}
                    </Grid>
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>What tasks would you like to be included in this request?</Typography>
                    {advisorRequestTypes && advisorRequestTypes.map((task, index) =>
                    <>
                        {
                            task.isActive && (
                                <div>
                                    <div key={index} style={{display: 'flex'}} className={classes.requestCheckBoxWrapper}>
                                        <>
                                            <Checkbox
                                                checked={checked.findIndex(checkedItem => checkedItem.advisorRequestTypeId === task.id) >= 0}
                                                onChange={(e) => handleSelect(task)}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            <div className={classes.tasksContainer}>
                                                <div>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        {task.description}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                    {
                                        checked.findIndex(checkedItem => checkedItem.advisorRequestTypeId === task.id) >= 0 && (
                                            <TaskExplornation
                                                formik={formik}
                                                checked={checked}
                                                index={checked.findIndex(checkedItem => checkedItem.advisorRequestTypeId === task.id)}
                                                setChecked={setChecked}
                                                task={task}
                                                handleAddTask={handleAddTask}
                                                handleRemoveTask={handleRemoveTask}
                                                classes={classes}
                                            />
                                            // <Grid item>
                                            //     <TextField
                                            //         width='100%'
                                            //         multiline
                                            //         formik={formik}
                                            //         name={`tasks[${checked.findIndex(checkedItem => checkedItem.advisorRequestTypeId === task.id)}].explanation`}
                                            //         value={formik.values.tasks[checked.findIndex(checkedItem => checkedItem.advisorRequestTypeId === task.id)].explanation || ''}
                                            //         placeholder="Add description"
                                            //         onChange={(e) => {
                                            //             const index = checked.findIndex(checkedItem => checkedItem.advisorRequestTypeId === task.id)
                                            //             const newChecked = [...checked]
                                            //             newChecked[index].explanation = e.target.value
                                            //             setChecked(newChecked)
                                            //             formik.handleChange(e);
                                            //         }}
                                            //     />
                                            // </Grid>
                                        )
                                    }
                                </div>
                            )
                            
                        }
                    </>
                    )}
                    {checkedError && <div className={classes.validationErrorNotification}>You should select at least a task.</div>}
                   
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Additional Notes</Typography>
                    <Grid item>
                        <TextField
                            width='100%'
                            multiline
                            formik={formik}
                            name="notes"
                            placeholder="Please be descriptive with exact details of what you need"
                        />
                    </Grid>
                </Grid>
                <Grid item md={12} style={{marginTop: '20px', width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Add Supporting Documents</Typography>
                    <Typography className={classes.deadlineDescription}>
                        Upload up to 10 PDF files. Max file size 20MB each
                    </Typography>
                    <input type="file" className={classes.fileInput} multiple onChange={handleChange} ref={inputRef} style={{display: 'none'}} />
                    <Button
                        $outlined
                        className={classes.requestBtn}
                        $width='100%'
                        onClick={() => changeFile()}
                    >
                        Add Attachment
                    </Button>
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    {uploadedPDF && fileNames.length > 0 && fileNames.map((fileName, documentIndex) =>
                        <div className={classes.documentContainer}  key={documentIndex}>
                            <div style={{display: 'flex'}}>
                                <div className={classes.pdfIconDiv}>PDF</div>
                                {
                                    fileName && (
                                        <a className={classes.documentDetailInfo} 
                                        > 
                                            {fileName.substring(0, 45)}
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>When do you need this by?</Typography>
                    <Typography className={classes.deadlineDescription}>
                        If the request is not completed by this date, then it will be automatically cancelled. Please note that concierges will do their best to get requests done quickly, but it is ultimately determined by supplier response times.
                    </Typography>
                   
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <DatePickerField
                            name="deadlineDay"
                            placeholder="Select date"
                            formik={formik}
                            width="200px" 
                            placement="topStart"  
                            startDate={tomorrow}                      
                        />
                        <TimePickerField
                            name="deadlineTime"
                            placeholder="Select time"
                            width="200px" 
                            formik={formik}
                            placement="topStart"
                            popupClassName={classes.timePickerTest}
                        />
                    </div>
                </Grid>
                <Grid item md={12} style={{marginTop: '30px', width: '100%'}}>
                    <Button
                        $primary
                        className={classes.nextBtn}
                        $width='100%'
                        onClick={() => {
                            handleClick()
                        }}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default RequestContent