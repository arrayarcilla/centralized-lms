//--- Important Imports
import React from 'react';

//--- Component Imports
import MenuBar from '../../components/Menubar';
import MemberCatalogTable from '../../components/MemberCatalogTable';

//--- Other Imports
import { 
    Segment, 
    Container, 
    Grid, GridRow, GridColumn, 
    List, ListItem,
    Header, HeaderContent,
    Form, FormInput, FormSelect,
    Icon,
    Image,
    Button } from 'semantic-ui-react';

function MemberCatalog() {
    return (
        <>
            <MenuBar />
            <div className='member-page-content'>
                <Segment padded raised>
                    <Grid columns={2} stackable relaxed='very' equal>
                        <GridRow only='computer tablet'>
                            <GridColumn width={2}><Header as='h1' content='Catalog' /></GridColumn>
                            <GridColumn width={14} textAlign='right'>
                                <Button content='Search Catalog' />
                                <Button content='Categories' />
                                <Button content='Authors' />
                                <Button content='Publishers' />
                                <Button content='Tags' />
                            </GridColumn>
                        </GridRow>
                        <GridRow only='mobile'>
                            <GridColumn width={3}><Header as='h1' content='Catalog' /></GridColumn>
                            <GridColumn width={13} textAlign='left'>
                                <Button content='Search Catalog' />
                                <Button content='Categories' />
                                <Button content='Authors' />
                                <Button content='Publishers' />
                                <Button content='Tags'/>
                            </GridColumn>
                        </GridRow>
                    </Grid>

                    <br />

                    <MemberCatalogTable />
                </Segment>

            </div>
        </>
    )
}

export default MemberCatalog;