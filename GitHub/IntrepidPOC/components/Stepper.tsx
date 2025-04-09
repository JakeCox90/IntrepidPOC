"use client"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

interface StepperProps {
  totalSteps: number
  currentStep: number
  style?: any
}

const Stepper = ({ totalSteps, currentStep, style }: StepperProps) => {
  const theme = useTheme()

  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.max(0, Math.min(currentStep, totalSteps - 1))

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            {
              backgroundColor:
                index === safeCurrentStep ? theme.colors.Text.Primary : theme.colors.Border["Border-Primary"],
              flex: 1,
              marginRight: index < totalSteps - 1 ? 4 : 0,
            },
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 4,
    paddingTop: 12,
    paddingBottom: 12,
    paddingInline: 16,
    alignItems: "center",
  },
  step: {
    height: 4,
    borderRadius: 2,
  },
})

export default Stepper
