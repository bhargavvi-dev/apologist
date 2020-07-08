class ContractGroupsController < ApplicationController

  before_action :set_contract_group, only: [:show, :edit, :update, :destroy, :new_contract, :create_contract, :update_contract, :destroy_contract, :get_contract]

  before_action :set_contract, only: [:update_contract, :destroy_contract, :get_contract]

  # GET /contract_groups
  # GET /contract_groups.json
  def index
    @back_to_top = true
    @contract_groups = fetch_contract_groups.page(page).per(first_limit)
  end

  def next_contract_groups
    @contract_groups = fetch_contract_groups.page(page).per(limit)
    render layout: false
  end

  # GET /contract_groups/new
  def new
    @contract_group = ContractGroup.new
  end

  # POST /contract_groups
  # POST /contract_groups.json
  def create
    begin
      @current_office = Office.find_by(@office.id)
      @contract_group = @current_office.contract_groups.create(contract_group_params.merge(creator: current_user, updater: current_user))
      @element_id = params[:element_id]
    rescue
      @error = true
    end
  end

  # GET /contract_groups/1/edit
  def edit
  end

  # PATCH/PUT /contract_groups/1
  # PATCH/PUT /contract_groups/1.json
  def update
    begin
      @contract_group.update(contract_group_params.merge(updater: current_user))
    rescue
      @error = true
    end
  end

  # DELETE /contract_groups/1
  # DELETE /contract_groups/1.json
  def destroy
    begin
      @contract_group.contracts.destroy_all
      @contract_group.destroy
    rescue
      @error = true
    end
  end

  def new_contract
    @contract= @contract_group.resources.new
  end

  def create_contract
    begin
      if contract_params[:media].present?
        @contract = @contract_group.resources.create(contract_params)
        unless @contract.media_attachment_name.present?
          @contract.update_attributes(:media_attachment_name => @contract.media_file_name)
        end
      else
        @error = @media_require = true
      end
      @element_id = params[:element_id]
    rescue
      @error = true
    end
  end

  def update_contract
    begin
      @contract.update(contract_params)
      unless @contract.media_attachment_name.present?
        @contract.update_attributes(:media_attachment_name => @contract.media_file_name)
      end      
    rescue
      @error = true
    end
  end

  def destroy_contract
    begin
      if @contract
        @contract.destroy
      end
    rescue
      @error = true
    end
  end

  def get_contract
  end

  private    

  def fetch_contract_groups
    @contract_groups = @current_office.contract_groups.order('group_type DESC, id DESC')
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_contract_group
    @contract_group = @current_office.contract_groups.find(params[:id])
  end

  def set_contract
    @contract = @contract_group.resources.find(params[:contract_id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def contract_group_params
    params.require(:contract_group).permit(:office_id, :name)
  end

  def contract_params
    params.require(:resource).permit(:media_attachment_name, :media, :resource_type_id, :resource_spec_id, :destroy)
  end
end
