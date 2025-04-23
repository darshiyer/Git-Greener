import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import {
  ReportFormData,
  cloudProviderOptions,
  programmingLanguageOptions,
  complianceOptions,
  regionOptions,
} from '../types/reportTypes';
import { generateComplianceReport } from '../services/reportGenerator';

const initialFormData: ReportFormData = {
  organizationName: '',
  industry: '',
  contactPerson: '',
  email: '',
  cloudProviders: [],
  totalServers: 0,
  monthlyCloudBudget: 0,
  primaryRegion: '',
  mainProgrammingLanguages: [],
  averageDailyTraffic: 0,
  peakHourTraffic: 0,
  numberOfMicroservices: 0,
  co2EmissionTarget: 0,
  energyEfficiencyTarget: 0,
  renewableEnergyPercentage: 0,
  performanceChallenges: '',
  scalabilityConcerns: '',
  sustainabilityConcerns: '',
  complianceRequirements: [],
  budgetConstraints: '',
  additionalNotes: '',
};

export const ReportForm: React.FC = () => {
  const [formData, setFormData] = useState<ReportFormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string[]>, field: keyof ReportFormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleNumberInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ReportFormData) => {
    const value = parseFloat(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateComplianceReport(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Stack spacing={4}>
        {/* Organization Details */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Organization Details</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Organization Name"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Contact Person"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Infrastructure Details */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Infrastructure Details</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Cloud Providers</InputLabel>
                  <Select
                    multiple
                    value={formData.cloudProviders}
                    onChange={(e) => handleSelectChange(e, 'cloudProviders')}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                  >
                    {cloudProviderOptions.map((provider) => (
                      <MenuItem key={provider} value={provider}>
                        <Checkbox checked={formData.cloudProviders.includes(provider)} />
                        {provider}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Total Servers"
                  value={formData.totalServers}
                  onChange={(e) => handleNumberInput(e, 'totalServers')}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Monthly Cloud Budget"
                  value={formData.monthlyCloudBudget}
                  onChange={(e) => handleNumberInput(e, 'monthlyCloudBudget')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Primary Region</InputLabel>
                  <Select
                    value={formData.primaryRegion}
                    onChange={(e) => handleSelectChange(e as SelectChangeEvent<string[]>, 'primaryRegion')}
                  >
                    {regionOptions.map((region) => (
                      <MenuItem key={region} value={region}>{region}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Application Details</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Programming Languages</InputLabel>
                  <Select
                    multiple
                    value={formData.mainProgrammingLanguages}
                    onChange={(e) => handleSelectChange(e, 'mainProgrammingLanguages')}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                  >
                    {programmingLanguageOptions.map((lang) => (
                      <MenuItem key={lang} value={lang}>
                        <Checkbox checked={formData.mainProgrammingLanguages.includes(lang)} />
                        {lang}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Average Daily Traffic"
                  value={formData.averageDailyTraffic}
                  onChange={(e) => handleNumberInput(e, 'averageDailyTraffic')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">requests/day</InputAdornment>,
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Peak Hour Traffic"
                  value={formData.peakHourTraffic}
                  onChange={(e) => handleNumberInput(e, 'peakHourTraffic')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">requests/hour</InputAdornment>,
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Number of Microservices"
                  value={formData.numberOfMicroservices}
                  onChange={(e) => handleNumberInput(e, 'numberOfMicroservices')}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Sustainability Goals */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Sustainability Goals</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="CO₂ Emission Target"
                  value={formData.co2EmissionTarget}
                  onChange={(e) => handleNumberInput(e, 'co2EmissionTarget')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kg/year</InputAdornment>,
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Energy Efficiency Target"
                  value={formData.energyEfficiencyTarget}
                  onChange={(e) => handleNumberInput(e, 'energyEfficiencyTarget')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    inputProps: { min: 0, max: 100 }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Renewable Energy Percentage"
                  value={formData.renewableEnergyPercentage}
                  onChange={(e) => handleNumberInput(e, 'renewableEnergyPercentage')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    inputProps: { min: 0, max: 100 }
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Current Challenges */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Current Challenges</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Performance Challenges"
                  name="performanceChallenges"
                  value={formData.performanceChallenges}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Scalability Concerns"
                  name="scalabilityConcerns"
                  value={formData.scalabilityConcerns}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Sustainability Concerns"
                  name="sustainabilityConcerns"
                  value={formData.sustainabilityConcerns}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Additional Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Compliance Requirements</InputLabel>
                  <Select
                    multiple
                    value={formData.complianceRequirements}
                    onChange={(e) => handleSelectChange(e, 'complianceRequirements')}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                  >
                    {complianceOptions.map((compliance) => (
                      <MenuItem key={compliance} value={compliance}>
                        <Checkbox checked={formData.complianceRequirements.includes(compliance)} />
                        {compliance}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Budget Constraints"
                  name="budgetConstraints"
                  value={formData.budgetConstraints}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Additional Notes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ minWidth: 200 }}
          >
            Generate Report
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}; 