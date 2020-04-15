// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './About.types';
import * as Styles from './About.styles';
import PageTitle from 'components/PageTitle';

const About: ComponentType<Props> = ({}: Props) => {
  return (
    <Styles.Container className="govuk-width-container">
      <PageTitle title="About the data" />
      <Styles.SectionHeader className="govuk-heading-m">Total and daily UK cases</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        COVID-19 cases are identified by taking specimens from people and sending these specimens to laboratories around the UK to be tested.  If the test is positive, this is a referred to as a lab-confirmed case.
        <br/>
        <br/>
        There are separate reporting processes for England, Scotland, Wales and Northern Ireland.  Each country provides data based on tests carried out in NHS (and PHE) laboratories.  These represent 'pillar 1' of the Government's mass testing programme.  The Department for Health and Social Care (DHSC) combines the counts from the four countries, and adds data from tests carried out by commercial partners ('pillar 2' of the mass-testing programme) to give daily and total (cumulative) counts of lab-confirmed cases.  These are submitted to Public Health England (PHE) to display on the dashboard.
        <br/>
        <br/>
        The UK total is not the sum of the four country totals as the pillar 2 cases cannot currently be included in the country totals.  All other data on this website are based only on cases detected through pillar 1.  Information about the different pillars is available on <a href="https://www.gov.uk/government/publications/coronavirus-covid-19-scaling-up-testing-programmes/coronavirus-covid-19-scaling-up-our-testing-programmes" target="_blank" rel="noopener noreferrer">GOV.UK</a>.
        <br/>
        <br/>
        Details of the processes for counting cases in the devolved administrations are available on their websites:
        <br/>
        <a href="https://www.gov.scot/coronavirus-covid-19/" target="_blank" rel="noopener noreferrer">Scottish Government coronavirus information</a>
        <br/>
        <a href="https://covid19-phwstatement.nhs.wales/" target="_blank" rel="noopener noreferrer">Public Health Wales coronavirus information</a>
        <br/>
        <a href="https://www.publichealth.hscni.net/publications/covid-19-surveillance-reports" target="_blank" rel="noopener noreferrer">Northern Ireland Public Health Agency coronavirus information</a>
        <br/>
        <br/>
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">England cases</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        In England, laboratories submit test results to PHE through the Second Generation Surveillance System (SGSS).  Cases received from laboratories by 00:30 are included in the counts published that day.  Confirmed positive cases are matched to ONS geographical area codes using the home postcode of the person tested.  Postcodes are supplied by the laboratory information systems.
        <br/>
        <br/>
        Duplicate tests for the same person are removed - the first positive specimen date is used as the specimen date for that person.
        <br/>
        <br/>
        Cases are aggregated to Upper Tier Local Authority (UTLA) and Region level and shown in the table and on the map.  UTLAs include Counties, Unitary Authorities, Metropolitan Districts and London Boroughs.  Some cases cannot be matched to a geographical area because postcode information is missing or received late.  This is why the UTLA and Region counts do not add up to the England total.
        <br/>
        <br/>
        Cumulative case counts include patients who are currently unwell, those have recovered and those that have died.  Total UTLA counts shown on this website can occasionally go down from one day to the next as data are revised.  Cases in people who have not been tested are not included in the confirmed case counts.
        <br/>
        <br/>  
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">Interpreting the maps</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        The maps show counts of cases in each Country, Region and Upper Tier Local Authority (UTLA) area.  The areas of the circles on the map are proportional to the counts.  UTLAs include counties and unitary authorities and vary enormously in population size, from under 100,000 to over 1.4 million.  Areas with larger populations would naturally have higher numbers of cases, even if the cases were evenly distributed around the country.
        <br/>
        <br/>
        To compare the numbers of cases between areas meaningfully it is necessary to calculate rates.  These will be added to this website as soon as possible.
        <br/>  
        <br/>
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">Cases over time</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        Daily case counts are shown in charts and tables, and can be downloaded for Regions and UTLAs as a csv file.  They are currently only available for England on this website.  Data for the rest of the UK will be included as soon as possible.
        <br/>  
        <br/>
        Lab-confirmed positive cases are attributed to the day the first specimen was taken from the person being tested (the specimen date).  Each day new cases are reported, but the dates they originate from cover the previous few days.  Because of this, there are few cases reported for the most recent date on the chart, but this does not mean the epidemic is tailing off.  The cases shown for recent days will build over the next few days.  Data from around five days ago can be considered complete.  Data for recent days are constantly being revised as more information becomes available.
       <br/>  
       <br/>
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">Total and daily deaths in UK hospitals</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        There are separate reporting processes for England, Scotland, Wales and Northern Ireland.  The Department for Health and Social Care (DHSC) combines these four counts to give the overall UK daily and total (cumulative) counts.  DHSC submits the counts to PHE to display on this website.  The four figures are not all taken from the same cut-off time each day: England and Wales counts are as at 17:00 the day before publication; Scotland counts are as at 09:00 the day before publication; Northern Ireland counts are as at 09:15 the day before publication.  
        <br/>
        <br/>
        Details of the processes for counting deaths in the devolved administrations are available on their websites – links provided in the Total and daily UK cases section on this page.
        <br/>
        <br/>
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">England deaths in hospitals</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        The figures currently shown for England are deaths in NHS-commissioned services of patients who have tested positively for COVID-19.  These include private provides currently providing NHS services.  Deaths are reported by the services to NHS England.  NHS England extracts data at 17:00 each day and these are the basis for the death counts reported on this website the following day.  After validation, the total number of deaths in England is published by NHS England and sent to DHSC.
        <br/>
        <br/>
        Deaths outside NHS services are not currently included in these counts.  Deaths of people who have tested positively for COVID-19 could in some cases be due to a different cause.
        <br/>
        <br/>
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">Deaths over time</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        Deaths are shown in charts and tables according to the day they were reported, not the day they occurred.  They can be downloaded as csv file.      
        <br/>
        <br/>
        Updated 15:30 15/04/2020
        <br/>
        <br/>
        Metadata developed with advice from the UK Statistics Authority
      </Styles.Body>
    </Styles.Container>
  );
};

export default About;
