import React from "react";
import MuiStepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import MuiButton from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";
import clsx from "clsx";
import styled from "styled-components";
import Home from "../components/Home";
import Courses from "../components/Courses";
import Restrictions from "../components/Restrictions";
import Lectures from "../components/Lectures";
import Labs from "../components/Labs";
import Generate from "../components/Generate";
import { StepButton } from "@material-ui/core";

const contents = [Home, Courses, Restrictions, Lectures, Labs, Generate];
const steps = ["Choose term", "Add courses", "Add restrictions", "Select lectures", "Select labs/tutorials", "Generate schedule"];

const Section = styled.div`
  font-family: 'Rubik', sans-serif;
  margin: 2rem;
  text-align: center;
  font-weight: 300;
`;

// https://material-ui.com/components/steppers/#customized-stepper
const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: theme.palette.secondary.main,
    },
  },
  completed: {
    "& $line": {
      borderColor: theme.palette.secondary.main,
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

const useQontoStepIconStyles = makeStyles((theme) => ({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: theme.palette.secondary.main,
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: theme.palette.secondary.main,
    zIndex: 1,
    fontSize: 18,
  },
}));

const QontoStepIcon = ({ active, completed }: any) => {
  const classes = useQontoStepIconStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <CheckIcon className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
};

const Button = withStyles({
  root: {
    color: "white",
    margin: "auto .5rem",
  }
})(({ text, ...props }: any) => (
  <MuiButton variant="contained" color="secondary" disableElevation {...props}>{text}</MuiButton>
));

function HomePage() {
  const [step, setStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set<number>());
  const MainSection = () => {
    const Content = contents[step];
    return (
      <div style={{ margin: "2rem auto" }}>
        <Content />
      </div>
    );
  };

  const Stepper = withStyles({
    root: {
      background: "none",
    }
  })(MuiStepper);

  const isCompleted = (currentStep: number) => {
    return completed.has(currentStep);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);

    const newCompleted = new Set(completed);
    newCompleted.add(step);
    setCompleted(newCompleted);
  };

  const handleSkip = (skipstep: number) => () => {
    if (skipstep === 0 || completed.has(skipstep - 1)) {
      setStep(skipstep);
    }
  };

  return (
    <Section>
      <Stepper activeStep={step} connector={<QontoConnector />} alternativeLabel>
        {steps.map((label, i) => (
          <Step key={i}>
            <StepButton onClick={handleSkip(i)}>{label}</StepButton>
            {/* <StepLabel StepIconComponent={QontoStepIcon} onClick={handleSkip(i)}>{label}</StepLabel> */}
          </Step>
        ))}
      </Stepper>
      <MainSection />
      {step > 0 && <Button onClick={handleBack} disabled={step === 0} text="Back"/>}
      {step < steps.length - 1 && <Button onClick={handleNext} disabled={step === steps.length - 1} text="Next" />}
    </Section>
  );
}

export default HomePage;
