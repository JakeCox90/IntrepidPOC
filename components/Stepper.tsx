'use client';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface StepperProps {
  totalSteps: number;
  currentStep: number;
  style?: StyleProp<ViewStyle>;
}

const Stepper = ({ totalSteps, currentStep, style }: StepperProps) => {
  const theme = useTheme();

  // Ensure currentStep is within bounds
  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.max(0, Math.min(currentStep, totalSteps - 1));

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index < totalSteps - 1 && styles.stepSpacer,
            {
              backgroundColor:
                index === safeCurrentStep ? theme.colors.Text.Primary : theme.colors.Border.Primary,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 4,
    width: '100%',
  },
  step: {
    borderRadius: 2,
    flex: 1,
    height: 4,
  },
  stepSpacer: {
    marginRight: 4,
  },
});

export default Stepper;
