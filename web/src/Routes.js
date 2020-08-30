// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/ho-so" page={CampPostSubmitPage} name="campPostSubmit" />
      <Route
        path="/draft-profiles/new"
        page={NewDraftProfilePage}
        name="newDraftProfile"
      />
      <Route
        path="/draft-profiles/{id}/edit"
        page={EditDraftProfilePage}
        name="editDraftProfile"
      />
      <Route
        path="/draft-profiles/{id}"
        page={DraftProfilePage}
        name="draftProfile"
      />
      <Route
        path="/draft-profiles"
        page={DraftProfilesPage}
        name="draftProfiles"
      />
      <Route path="/metas/new" page={NewMetaPage} name="newMeta" />
      <Route path="/metas/{id}/edit" page={EditMetaPage} name="editMeta" />
      <Route path="/metas/{id}" page={MetaPage} name="meta" />
      <Route path="/metas" page={MetasPage} name="metas" />
      <Route path="/camp-form" page={CampFormPage} name="campForm" />
      <Route path="/" page={CampFormPage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
