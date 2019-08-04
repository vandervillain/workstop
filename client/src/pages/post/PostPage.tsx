import * as React from 'react';
import { get, postFormData } from 'src/utils/request';
import { PostModel } from 'src/models/data';
import { withRouter } from 'react-router';
import { Autocomplete } from 'src/components/Autocomplete';
import { CityArray } from 'src/utils/arrays';
import { Input } from 'src/components/Input';
import { Uploader } from 'src/components/Uploader';
//import { getAncestorByTag } from 'src/utils/utils';

interface P {
  match; 
  location;
  history;
}

interface S {
  model: PostModel;
  page: number;
}

class PostPage extends React.Component<P, S> {
  cityRef;
  zipRef;

  constructor(props: any) {
    super(props);
    this.state = {
      model: {
        title: undefined,
        body: undefined,
        city: undefined,
        zip: undefined,
      },
      page: 0
    };

    this.cityRef = React.createRef();
    this.zipRef = React.createRef();
  }

  getPost(id): void {
    get(`/api/post/${id}`).then((post: PostModel) => {
      if (post) {
        var newState = {
          model: post
        };
        this.setState(newState);
      }
    });
  }

  getCities() {
    var rtn: {key: string; value: string}[] = [];
    for (var c in CityArray) {
      rtn.push({
        key: c, 
        value: CityArray[c]
      });
    }
    return rtn;
  }

  setLocationFocus(name: string) {
    if (name == "city") {
      this.zipRef.current.value = "";
      this.zipRef.current.required = false;
      this.cityRef.current.required = true;
    }
    else if (name == "zip") {
      this.cityRef.current.value = "";
      this.cityRef.current.required = false;
      this.zipRef.current.required = true;
    }
  }

  prevPage(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      page: this.state.page - 1
    });
  }

  nextPage(e) {
    e.preventDefault();

    var form = e.target as HTMLFormElement,
      formData = new FormData(form),
      title = formData.get('title') as string | undefined,
      body = formData.get('body') as string | undefined,
      city = formData.get('city') as string | undefined,
      zip = formData.get('zip') as string | undefined,
      model: PostModel = {
        title: title !== undefined ? title : this.state.model.title,
        body: body !== undefined ? body : this.state.model.body,
        city: city !== undefined ? city : this.state.model.city,
        zip: zip !== undefined ? zip : this.state.model.zip
      };

    this.setState({
      model: model,
      page: this.state.page + 1
    });
  }

  submit(e) {
    e.preventDefault();

    var form = e.target as HTMLFormElement,
      formData = new FormData(form);

    postFormData('api/post', formData).then((r) => {
      var newPost = r as PostModel;
      this.props.history.push('/post/' + newPost._id);
    });
    
    return false;
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    if (id) {
      this.getPost(id);
    }
    else {
      this.setState({
        ...this.state,
        page: 1
      });
    }
  }
    
  public render() {
    var id = this.props.match.params.id;
    return (
      <div className="post-page row">
        <div className="col-md-2">
          <div className="back" onClick={(e) => this.props.history.push('/')}><span className="arrow"></span><span className="label">Back</span></div>
        </div>
        <div className="col-md-8">
          { id ? (
            <div> 
              <h2>{this.state.model.title}</h2>
              <h4>{this.state.model.city}</h4>
              <p>{this.state.model.body}</p>
            </div>
            ) : this.state.page === 1 ? (
              <form autoComplete="off" onSubmit={(e) => this.nextPage(e)}>
                <div className="field">
                  <Input type="text" name="title" required={true} label="Title" defaultValue={this.state.model.title} />
                </div>
                <div className="field">
                  <span className="label">Description</span>
                  <textarea name="body" required={true} rows={10} cols={10} defaultValue={this.state.model.body} />
                </div>
                <div className="buttons">
                  {/* <button className="link-btn" onClick={(e) => this.nextPage(e)}>Next</button> */}
                  <input type="submit" value="Next" />
                </div>
              </form>
            ) : this.state.page === 2 ? (
              <form autoComplete="off" onSubmit={(e) => this.nextPage(e)}>
                <input type="hidden" name="title" value={this.state.model.title} />
                <input type="hidden" name="body" value={this.state.model.body} />
                <div className="field">
                  <Autocomplete inputRef={this.cityRef} name="city" required={true} label="City" options={this.getCities()} onFocus={(e) => this.setLocationFocus('city')} defaultValue={this.state.model.city} />
                </div>
                <p>or</p>
                <div className="field">
                  <Input inputRef={this.zipRef} type="text" name="zip" required={true} label="Zip" onFocus={(e) => this.setLocationFocus('zip')} defaultValue={this.state.model.zip} />
                </div>
                <div className="buttons">
                  <button className="link-btn" onClick={(e) => this.prevPage(e)}>Back</button>
                  {/* <button className="link-btn" onClick={(e) => this.nextPage(e)}>Next</button> */}
                  <input type="submit" value="Next" />
                </div>
              </form>
            ) : this.state.page === 3 ? (
              <form autoComplete="off" onSubmit={(e) => this.submit(e)}>
                <input type="hidden" name="title" value={this.state.model.title} />
                <input type="hidden" name="body" value={this.state.model.body} />
                <input type="hidden" name="city" value={this.state.model.city} />
                <input type="hidden" name="zip" value={this.state.model.zip} />
                <Uploader name="images" label="Upload Images" />
                <div className="buttons">
                  <button className="link-btn" onClick={(e) => this.prevPage(e)}>Back</button>
                  <input type="submit" value="Create Post" />
                </div>
              </form>
            ) : (<div></div>)
          }
        </div>
        <div className="col-md-2">
        </div>
      </div>
    );
  }
}

export default withRouter(PostPage);
