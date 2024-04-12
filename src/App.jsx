import "boosted/dist/js/boosted.bundle.min.js"
import {UploadExcel} from "./Components/ExcelCollector"
import {SampleComponent} from "./Components/Modeler"


function App() { return <>
  <header>
<nav className="navbar navbar-dark bg-dark navbar-expand-lg" 
    aria-label="Global navigation - No title with nav-under example">
  <div className="container-xxl">
    <div className="navbar-brand me-auto me-lg-4">
      <a className="stretched-link" href="#">
        <img src="/orange-logo.svg" alt="Boosted - Back to Home"
           loading="lazy" width="50" height="50"/>
      </a> <h1 className="title">BPMN</h1>
    </div>
    <button className="navbar-toggler collapsed" type="button" 
      data-bs-toggle="collapse" data-bs-target=".global-header-2" 
      aria-controls="global-header-2.1 global-header-2.2" 
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div id="global-header-2.1" 
      className="navbar-collapse collapse me-lg-auto global-header-2">
      <ul className="navbar-nav">
        <li className="nav-item"><a className="nav-link active" href="#"
           aria-current="page">Discover</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Shop</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Services</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Entertainment</a></li>
        <li className="nav-item"><a className="nav-link" href="#">News</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Support</a></li>
      </ul>
    </div>
    <form className="d-flex d-none d-lg-flex col-3 navbar-item" role="search">
      <input type="search" placeholder="Search" aria-label="Search" 
      className="form-control bg-transparent text-white border border-2 border-dark" />
    </form>
    <div id="global-header-2.2" 
    className="navbar-collapse collapse d-sm-flex global-header-2">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="#" className="nav-link nav-icon">            
            <svg width="1.5rem" height="1.5rem" fill="currentColor" 
              aria-hidden="true" focusable="false" className="overflow-visible">
              <use xlinkHref="#user"></use>
            </svg>   <span className="visually-hidden">My account</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </header>
  <main>
    <SampleComponent></SampleComponent>
    <div className="bloc_div asm_form_div col-sm-12">
      <div className="container mt-4 mb-4" id="tiny_little">
        <form className="needs-validation mb-5 col-12" noValidate="">
          <fieldset>
          <div className="row">
            <div className="col-12">
              <p className="fw-bold mb-4">
                <span className="text-primary me-1">*</span>indicates required
              </p>
            </div>
            <div className="col-sm-4 col-md-6 mb-3">
              <label htmlFor="selectTitle" id="selectTitleLabel" 
                className="form-label is-required">Title<span 
                className="visually-hidden"> (required)</span></label>
              <select className="form-select" id="selectTitle" 
                aria-labelledby="selectTitleLabel selectTitleFeedback" 
                autoComplete="sex" required="">
                <option defaultValue="" disabled="" value="" 
                  aria-hidden="true">Select a title</option>
                <option value="1">Miss</option>
                <option value="2">Mr.</option>
                <option value="3">Mrs.</option>
                <option value="3">Ms.</option>
                <option value="4">Prefer not to say</option>
              </select>
              <div className="valid-feedback">
                Looks good!
              </div>
              <div id="selectTitleFeedback" className="invalid-feedback">
                Please select a valid title.
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="Username" id="UsernameLabel" 
                  className="form-label is-required">User name
                    <span className="visually-hidden"> (required)</span></label>
                <input type="text" className="form-control" 
                  id="Username" aria-labelledby="UsernameLabel UsernameFeedback"
                  autoComplete="family-name" required=""/>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div id="UsernameFeedback" className="invalid-feedback">
                  Please enter a valid last name.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" id="emailLabel" 
                  className="form-label is-required">Email
                  <span className="visually-hidden"> (required)</span></label>
                <input type="email" className="form-control" 
                  id="email" aria-labelledby="emailLabel emailFeedback" 
                  autoComplete="email" required=""/>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div id="emailFeedback" className="invalid-feedback">
                  Please provide a valid email.
                </div>
              </div>
            {/* <div className="mb-3">
                <label htmlFor="country" id="countryLabel" 
                  className="form-label is-required">Country
                  <span className="visually-hidden"> (required)</span></label>
                <select className="form-select" id="country" 
                  aria-labelledby="countryLabel countryFeedback" 
                  autoComplete="country-name" required="">
                  <option defaultValue="" disabled="" value="" 
                  aria-hidden="true">Select a country</option>
                  <option value="1">Australia</option>
                  <option value="2">Canada</option>
                  <option value="3">France</option>
                  <option value="4">USA</option>
                </select>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div id="countryFeedback" className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="company" id="companyLabel" className="form-label is-required">Name of company<span className="visually-hidden"> (required)</span></label>
                <input type="text" className="form-control" id="company" aria-labelledby="companyLabel companyFeedback" required=""/>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div id="companyFeedback" className="invalid-feedback">
                  Please enter a valid company name.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="business" id="businessLabel" className="form-label is-required">Business type<span className="visually-hidden"> (required)</span></label>
                <select className="form-select" id="business" aria-labelledby="businessLabel businessFeedback" required="">
                  <option defaultValue="" disabled="" value="" aria-hidden="true">Select a type</option>
                  <option value="1">Corporation</option>
                  <option value="2">Limited liability company</option>
                  <option value="3">Partnership</option>
                  <option value="4">Sole proprietorship</option>
                </select>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div id="businessFeedback" className="invalid-feedback">
                  Please select a valid business type.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="website" id="websiteLabel" className="form-label">Website<span className="visually-hidden"> (required)</span></label>
                <input type="text" className="form-control" id="website" aria-labelledby="websiteLabel websiteFeedback"/>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div id="websiteFeedback" className="invalid-feedback">
                  Please enter a valid website.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="message" id="messageLabel" className="form-label is-required">Message<span className="visually-hidden"> (required)</span></label>
                <button type="button" className="form-helper" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Help for text area">
                  <span className="visually-hidden">Helper for text area</span>
                </button>
                <textarea className="form-control" id="message" rows="5" placeholder="Describe your business and your motivation in becoming an Orange reseller" aria-labelledby="messageLabel messageFeedback" required=""></textarea>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div id="messageFeedback" className="invalid-feedback">
                  Please enter a valid message.
                </div>
              </div> */}
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </div>
          </div>
          </fieldset>
        </form>
        <UploadExcel /> 
    </div> </div>
  </main>
  <footer className='footer bg-dark navbar-dark'>
  <h2 className="visually-hidden">Sitemap &amp; information</h2>
  <div className="container-xxl footer-title-content">
    <h3 className="footer-heading">Sign up to our mailing list</h3>
    <div className="row">
      <form className="d-flex col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5 gap-2 gap-md-3">
        <label htmlFor="inputEmail5" className="visually-hidden">Email</label>
        <input type="email" className="form-control text-bg-dark border-dark" id="inputEmail5" placeholder="Enter your email"/>
        <button type="submit" className="btn btn-secondary btn-inverse text-nowrap">Sign up</button>
      </form>
    </div>
  </div>
  <div className="border-bottom border-1 border-dark"></div>
  <div className="container-xxl footer-social">
    <h3 className="footer-heading me-md-3">Follow us</h3>
    <ul className="navbar-nav gap-2 flex-row align-self-start">
      <li><a href="#" className="btn btn-icon btn-social btn-twitter btn-inverse"><span className="visually-hidden">Twitter</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-facebook btn-inverse"><span className="visually-hidden">Facebook</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-instagram btn-inverse"><span className="visually-hidden">Instagram</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-whatsapp btn-inverse"><span className="visually-hidden">WhatsApp</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-linkedin btn-inverse"><span className="visually-hidden">LinkedIn</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-youtube btn-inverse"><span className="visually-hidden">YouTube</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-snapchat btn-inverse"><span className="visually-hidden">Snapchat</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-pinterest btn-inverse"><span className="visually-hidden">Pinterest</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-mail btn-inverse"><span className="visually-hidden">Mail</span></a></li>
      <li><a href="#" className="btn btn-icon btn-social btn-tiktok btn-inverse"><span className="visually-hidden">TikTok</span></a></li>
    </ul>
  </div>
  <div className="border-bottom border-1 border-dark"></div>
  <div className="container-xxl footer-nav">
    <nav className="accordion accordion-dark" id="accordion5" aria-label="Sitemap footer 5">
      <div className="row">
        <div className="footer-column col-md-3">
          <h3 className="accordion-header footer-heading" id="headingOne5">
            <button className="accordion-button collapsed container-xxl px-1 d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5">
              Category
            </button>
            <span className="d-none d-md-flex">Category</span>
          </h3>
          <div id="collapseOne5" className="container-xxl accordion-collapse collapse" data-bs-parent="#accordion5">
            <ul className="navbar-nav">
              <li><a className="nav-link" href="#" aria-describedby="headingOne5">Subcategory</a></li>
              <li><a className="nav-link" href="#" aria-describedby="headingOne5">Subcategory</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-column col-md-3">
          <h3 className="accordion-header footer-heading" id="headingTwo5">
            <button className="accordion-button collapsed container-xxl px-1 d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo5" aria-expanded="true" aria-controls="collapseTwo5">
              Category
            </button>
            <span className="d-none d-md-flex">Category</span>
          </h3>
          <div id="collapseTwo5" className="container-xxl accordion-collapse collapse" data-bs-parent="#accordion5">
            <ul className="navbar-nav">
              <li><a className="nav-link" href="#" aria-describedby="headingTwo5">Subcategory</a></li>
              <li><a className="nav-link" href="#" aria-describedby="headingTwo5">Subcategory</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-column col-md-3">
          <h3 className="accordion-header footer-heading" id="headingThree5">
            <button className="accordion-button collapsed container-xxl px-1 d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree5" aria-expanded="true" aria-controls="collapseThree5">
              Category
            </button>
            <span className="d-none d-md-flex">Category</span>
          </h3>
          <div id="collapseThree5" className="container-xxl accordion-collapse collapse" data-bs-parent="#accordion5">
            <ul className="navbar-nav">
              <li><a className="nav-link" href="#" aria-describedby="headingThree5">Subcategory</a></li>
              <li><a className="nav-link" href="#" aria-describedby="headingThree5">Subcategory</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-column col-md-3">
          <h3 className="accordion-header footer-heading" id="headingFour5">
            <button className="accordion-button collapsed container-xxl px-1 d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour5" aria-expanded="true" aria-controls="collapseFour5">
              Category
            </button>
            <span className="d-none d-md-flex">Category</span>
          </h3>
          <div id="collapseFour5" className="container-xxl accordion-collapse collapse" data-bs-parent="#accordion5">
            <ul className="navbar-nav">
              <li><a className="nav-link" href="#" aria-describedby="headingFour5">Subcategory</a></li>
              <li><a className="nav-link" href="#" aria-describedby="headingFour5">Subcategory</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <div className="border-bottom border-1 border-dark"></div>
  <div className="container-xxl footer-service">
    <ul className="navbar-nav gap-3 gap-md-4">
      <li><a className="nav-link gap-1" href="#"><svg width="1.875rem" height="1.875rem" focusable="false" aria-hidden="true"><use xlinkHref="../assets/img/boosted-sprite.svg#location-pin-compass"></use></svg><span>Store locator</span></a></li>
      <li><a className="nav-link gap-1" href="#"><svg width="1.875rem" height="1.875rem" focusable="false" aria-hidden="true"><use xlinkHref="../assets/img/boosted-sprite.svg#mobile-network-coverage"></use></svg><span>Coverage checker</span></a></li>
      <li><a className="nav-link gap-1" href="#"><svg width="1.875rem" height="1.875rem" focusable="false" aria-hidden="true"><use xlinkHref="../assets/img/boosted-sprite.svg#live-chat"></use></svg><span>Contact us</span></a></li>
      <li><a className="nav-link gap-1" href="#"><svg width="1.875rem" height="1.875rem" focusable="false" aria-hidden="true"><use xlinkHref="../assets/img/boosted-sprite.svg#child-protection"></use></svg><span>Child protection</span></a></li>
    </ul>
  </div>
  <div className="border-bottom border-1 border-dark"></div>
  <div className="container-xxl footer-terms">
    <ul className="navbar-nav gap-md-3">
      <li className="fw-bold">© Orange 2023</li>
      <li><a className="nav-link" href="#">Terms and conditions</a></li>
      <li><a className="nav-link" href="#">Privacy</a></li>
      <li><a className="nav-link" href="#">Accessibility statement</a></li>
      <li><a className="nav-link" href="#">Cookie policy</a></li>
    </ul>
  </div>
  </footer></> 
}
export default App
