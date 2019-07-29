import * as React from 'react';
import { get } from 'src/utils/request';
import { PostModel } from 'src/models/data';
import { withRouter } from 'react-router';
import { Autocomplete } from 'src/components/Autocomplete';
import { CityArray } from 'src/utils/arrays';

interface P {
  match; 
  location;
  history;
}

interface S {
  model: PostModel;
}

class PostPage extends React.Component<P, S> {

  constructor(props: any) {
    super(props);
    this.state = {
      model: {}
    };
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

  componentDidMount() {
    var id = this.props.match.params.id;
    if (id) {
      this.getPost(id);
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
            ) : (
              <form autoComplete="off">
                <div className="field">
                  <span className="label">City</span>
                  <Autocomplete name="city" options={this.getCities()} defaultValue="Suquamish" />
                </div>
                <div className="field">
                  <span className="label">Title</span>
                  <input type="text" />
                </div>
                <div className="field">
                  <span className="label">Description</span>
                  <textarea rows={10} cols={10} />
                </div>
                <input type="submit" value="Create" />
              </form>
            ) 
          }
        </div>
        <div className="col-md-2">
        </div>
      </div>
    );
  }
}

export default withRouter(PostPage);
